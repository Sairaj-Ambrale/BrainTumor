import os
from dotenv import load_dotenv

load_dotenv()

# Folder containing svm_model.pkl, scaler.pkl, pca.pkl, label_map.pkl
# (the four files produced at the end of Brain_Tumor_Classification.ipynb)
MODEL_DIR = os.getenv("MODEL_DIR", os.path.join(os.path.dirname(__file__), "model"))

SVM_MODEL_PATH = os.path.join(MODEL_DIR, "svm_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
PCA_PATH = os.path.join(MODEL_DIR, "pca.pkl")
LABEL_MAP_PATH = os.path.join(MODEL_DIR, "label_map.pkl")

# Must match the training notebook exactly, or predictions will be wrong.
IMAGE_SIZE = (128, 128)  # (width, height) passed to cv2.resize
HOG_PARAMS = dict(
    orientations=9,
    pixels_per_cell=(8, 8),
    cells_per_block=(2, 2),
    block_norm="L2-Hys",
)

# Friendly labels shown in the frontend, keyed by the notebook's folder names.
DISPLAY_NAMES = {
    "glioma": "Glioma Tumor",
    "meningioma": "Meningioma Tumor",
    "notumor": "No Tumor Detected",
    "pituitary": "Pituitary Tumor",
}

# Frontend origin(s) allowed to call this API in development.
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

PORT = int(os.getenv("PORT", "5000"))
MAX_CONTENT_LENGTH_MB = int(os.getenv("MAX_CONTENT_LENGTH_MB", "10"))
