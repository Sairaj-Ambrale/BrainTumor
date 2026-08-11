# NeuroScan AI — Backend

Flask API that serves your trained HOG + PCA + SVM brain tumor classifier
(from `Brain_Tumor_Classification.ipynb`) and matches the contract the
NeuroScan AI React frontend expects.

## What this replicates

Your notebook's pipeline, per image:

```
read image → resize (128, 128) → grayscale → HOG features
  (orientations=9, pixels_per_cell=(8,8), cells_per_block=(2,2), block_norm='L2-Hys')
→ StandardScaler.transform → PCA.transform → SVC.predict
```

`preprocessing.py` mirrors this exactly. If you ever change the
preprocessing in the notebook, update `preprocessing.py` and `config.py`
(`IMAGE_SIZE`, `HOG_PARAMS`) to match, or predictions will be wrong.

## 1. Add your trained model files

From the end of the notebook, you already download:

```
svm_model.pkl
scaler.pkl
pca.pkl
label_map.pkl
```

Drop all four into the `model/` folder here.

## 2. Install & run

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

The API runs at `http://localhost:5000` by default.

Check it loaded correctly:

```bash
curl http://localhost:5000/health
```

## 3. Connect the frontend

In your React project's `.env`:

```
VITE_API_URL=http://localhost:5000
```

That's it — the frontend already posts to `POST /predict` with the image
under form field `image`, and expects:

```json
{ "prediction": "Glioma Tumor", "confidence": 0.87 }
```

which is exactly what `app.py` returns.

## About the confidence score

Your notebook trained `SVC(kernel='linear', random_state=42)` — probability
estimates were **not** enabled (`probability=True` wasn't set), so scikit-learn
doesn't expose a calibrated `predict_proba()`. This backend approximates a
confidence score with a softmax over `decision_function()` margins, which is
reasonable for display purposes but isn't a true calibrated probability.

If you want real calibrated probabilities:

1. In the notebook, retrain with:
   ```python
   svm = SVC(kernel='linear', probability=True, random_state=42)
   ```
2. Re-save `svm_model.pkl` and drop it back into `model/`.
3. In `model_loader.py`, the code already prefers `predict_proba()`
   automatically when `probability=True` was set — no other changes needed.

Note `probability=True` makes training noticeably slower (it fits an
internal cross-validated calibration), so it's worth doing once and saving
the result rather than retraining on every run.

## Class labels

Your `label_map.pkl` maps folder names to indices:

```python
{"glioma": 0, "meningioma": 1, "notumor": 2, "pituitary": 3}
```

`config.py` maps these to the friendly labels shown in the UI — edit
`DISPLAY_NAMES` if you want different wording:

```python
DISPLAY_NAMES = {
    "glioma": "Glioma Tumor",
    "meningioma": "Meningioma Tumor",
    "notumor": "No Tumor Detected",
    "pituitary": "Pituitary Tumor",
}
```

## Error handling

`/predict` returns clear JSON errors (all with an `"error"` key, which the
frontend already reads) for:

- Missing `image` field
- Empty filename / empty file
- Unsupported file type
- Corrupt/undecodable image
- Model artifacts missing (503, with the exact missing filename)
- File too large (413)
- Any unexpected server error (500)

## Project structure

```
app.py              Flask routes: /predict, /health
config.py            Paths, HOG params, CORS origins, display names
preprocessing.py      Image decode + HOG feature extraction (mirrors notebook)
model_loader.py       Loads the four .pkl artifacts, runs scaler → PCA → SVM
model/                Put svm_model.pkl, scaler.pkl, pca.pkl, label_map.pkl here
requirements.txt
.env.example
```

## Deploying for real use

Reminder: this is an educational/research classifier, not a diagnostic
tool. Any deployment should keep the "not a medical diagnosis" disclaimer
visible in the UI (the frontend already includes this).
