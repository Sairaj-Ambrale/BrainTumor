# NeuroScan AI — Frontend

A modern, responsive React + Vite frontend for a brain tumor MRI classification
web app. Built for educational and research purposes only — **not** a medical
diagnostic tool.

## Stack

- React 18 + Vite
- React Router (client-side routing)
- Tailwind CSS (design system: white background, blue/purple accents, rounded
  cards, soft shadows)
- lucide-react (icons)

## Getting started

```bash
npm install
cp .env.example .env   # then edit VITE_API_URL if needed
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Connecting your Python ML backend

The frontend expects a backend endpoint at:

```
POST {VITE_API_URL}/predict
Content-Type: multipart/form-data
field name: "image"
```

Expected JSON response:

```json
{
  "prediction": "Tumor Detected",
  "confidence": 0.947
}
```

- `prediction` — a string label (works with any class names, e.g. "Glioma",
  "Meningioma", "Pituitary Tumor", "No Tumor").
- `confidence` — a float between 0 and 1.

Set the backend URL in `.env`:

```
VITE_API_URL=http://localhost:5000
```

A minimal Flask example for reference:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    # TODO: preprocess `file` and run your trained model
    prediction = "Tumor Detected"
    confidence = 0.947

    return jsonify({"prediction": prediction, "confidence": confidence})

if __name__ == "__main__":
    app.run(port=5000)
```

## Project structure

```
src/
  components/       Reusable UI: Navbar, Footer, ImageUploader, ImagePreview,
                     LoadingState, ResultCard, ConfidenceBar, Disclaimer, ErrorBanner
  pages/             Home, Analyze, Results, HowItWorks, About
  context/           AnalysisContext — shares uploaded image + result across pages
  utils/             api.js (fetch logic + error handling), validateFile.js
  config/            api.js — reads VITE_API_URL and upload constraints
```

## Error handling

The app handles:

- Invalid file types/sizes (client-side validation before upload)
- Missing image on analyze
- Network/unreachable backend errors
- Non-2xx server responses
- Malformed or unexpected JSON responses

## Build

```bash
npm run build
npm run preview
```

## Disclaimer

NeuroScan AI is for educational and research purposes only. It does not
provide medical diagnoses. Always consult a qualified medical professional
for any health concerns.
