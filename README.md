# NeuroScan AI — Full Stack

A brain tumor MRI classification web app: React + Vite frontend, Flask
backend serving a HOG + PCA + SVM model. Educational/research use only —
not a medical diagnostic tool.

```
neuroscan-ai-fullstack/
  frontend/    React + Vite + Tailwind UI (Home, Analyze, Results, How It Works, About)
  backend/     Flask API: POST /predict, loads your trained .pkl model
```

## Quick start (run both together)

**1. Backend** — open a terminal in `backend/`:

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Drop your four trained model files into `backend/model/`:

```
svm_model.pkl
scaler.pkl
pca.pkl
label_map.pkl
```

Then:

```bash
cp .env.example .env
python app.py
```

Backend runs at `http://localhost:5000`. Confirm it's healthy:

```bash
curl http://localhost:5000/health
```

**2. Frontend** — open a second terminal in `frontend/`:

```bash
cd frontend
npm install
cp .env.example .env      # already points VITE_API_URL at localhost:5000
npm run dev
```

Frontend runs at `http://localhost:5173`. Open it, go to **Analyze MRI**,
upload a JPG/PNG scan, and it'll call the Flask backend and show the
prediction + confidence.

## How they connect

- Frontend reads `VITE_API_URL` from `frontend/.env` and POSTs the image as
  `multipart/form-data` (field name `image`) to `{VITE_API_URL}/predict`.
- Backend's `/predict` runs your exact notebook pipeline (resize → grayscale
  → HOG → StandardScaler → PCA → SVM) and returns:
  ```json
  { "prediction": "Glioma Tumor", "confidence": 0.87 }
  ```
- Backend's CORS is restricted to `http://localhost:5173` by default — if
  you run the frontend on a different port/host, update `CORS_ORIGINS` in
  `backend/.env`.

## Deploying

Frontend and backend are independent — deploy them separately (e.g.
frontend to Vercel/Netlify, backend to Render/Railway/a VM) and just point
`VITE_API_URL` at wherever the backend ends up, and add that frontend URL
to `CORS_ORIGINS` on the backend.

See `frontend/README.md` and `backend/README.md` for details specific to
each half, including the confidence-score caveat (the SVM wasn't trained
with `probability=True`, so confidence is an approximation — details in
`backend/README.md`).
