from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

from config import CORS_ORIGINS, PORT, MAX_CONTENT_LENGTH_MB
from preprocessing import preprocess_image_bytes, PreprocessError
from model_loader import model_bundle

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/jpg", "image/png"}

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH_MB * 1024 * 1024
CORS(app, origins=CORS_ORIGINS)

model_bundle.load()


def _has_allowed_extension(filename: str) -> bool:
    filename = filename.lower()
    return any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS)


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok" if model_bundle.loaded else "model_not_loaded",
            "model_loaded": model_bundle.loaded,
            "error": model_bundle.load_error,
        }
    ), (200 if model_bundle.loaded else 503)


@app.post("/predict")
def predict():
    if not model_bundle.loaded:
        return jsonify(
            {"error": model_bundle.load_error or "Model is not loaded on the server."}
        ), 503

    if "image" not in request.files:
        return jsonify({"error": "No image file provided. Send it as form field 'image'."}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    if not _has_allowed_extension(file.filename) and file.mimetype not in ALLOWED_MIME_TYPES:
        return jsonify({"error": "Unsupported file type. Please upload a JPG or PNG image."}), 400

    try:
        file_bytes = file.read()
        if not file_bytes:
            return jsonify({"error": "The uploaded file is empty."}), 400

        feature_vector = preprocess_image_bytes(file_bytes)
        prediction, confidence = model_bundle.predict(feature_vector)

        return jsonify({"prediction": prediction, "confidence": confidence}), 200

    except PreprocessError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:  # noqa: BLE001 - never leak a raw 500 with no message
        app.logger.exception("Prediction failed")
        return jsonify({"error": f"Prediction failed on the server: {e}"}), 500


@app.errorhandler(RequestEntityTooLarge)
def handle_large_file(_e):
    return jsonify({"error": f"File too large. Max size is {MAX_CONTENT_LENGTH_MB}MB."}), 413


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
