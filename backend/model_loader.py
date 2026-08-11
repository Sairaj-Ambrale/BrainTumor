"""
Loads the four artifacts saved at the end of the training notebook:

  svm_model.pkl   -> sklearn.svm.SVC (kernel='linear')
  scaler.pkl      -> sklearn.preprocessing.StandardScaler
  pca.pkl         -> sklearn.decomposition.PCA
  label_map.pkl   -> dict, e.g. {"glioma": 0, "meningioma": 1, ...}

and exposes a single `predict(feature_vector)` function used by app.py.
"""
import numpy as np
import joblib

from config import SVM_MODEL_PATH, SCALER_PATH, PCA_PATH, LABEL_MAP_PATH, DISPLAY_NAMES


class ModelBundle:
    def __init__(self):
        self.svm = None
        self.scaler = None
        self.pca = None
        self.label_map = None
        self.index_to_name = None
        self.loaded = False
        self.load_error = None

    def load(self):
        try:
            self.svm = joblib.load(SVM_MODEL_PATH)
            self.scaler = joblib.load(SCALER_PATH)
            self.pca = joblib.load(PCA_PATH)
            self.label_map = joblib.load(LABEL_MAP_PATH)
            self.index_to_name = {v: k for k, v in self.label_map.items()}
            self.loaded = True
        except FileNotFoundError as e:
            # Deferred failure: the server still starts, but /predict will
            # return a clear 503 telling the caller which file is missing.
            self.load_error = (
                f"Model artifact not found: {e.filename}. Place svm_model.pkl, "
                "scaler.pkl, pca.pkl and label_map.pkl in the model/ folder."
            )
        except Exception as e:  # noqa: BLE001 - surface any load error clearly
            self.load_error = f"Failed to load model artifacts: {e}"

    def predict(self, feature_vector: np.ndarray):
        """
        Runs scaler -> PCA -> SVM on a single (1, n_features) HOG vector.
        Returns (display_label: str, confidence: float in [0, 1]).
        """
        if not self.loaded:
            raise RuntimeError(self.load_error or "Model is not loaded.")

        scaled = self.scaler.transform(feature_vector)
        reduced = self.pca.transform(scaled)

        predicted_index = int(self.svm.predict(reduced)[0])

        # NOTE: the notebook trained SVC() with the default probability=False,
        # so there's no calibrated predict_proba(). We approximate a confidence
        # score with a softmax over the decision_function margins instead.
        # For calibrated probabilities, retrain with SVC(kernel='linear',
        # probability=True) and swap this block for self.svm.predict_proba(reduced).
        if hasattr(self.svm, "predict_proba") and getattr(self.svm, "probability", False):
            proba = self.svm.predict_proba(reduced)[0]
            class_order = list(self.svm.classes_)
            confidence = float(proba[class_order.index(predicted_index)])
        else:
            scores = self.svm.decision_function(reduced)[0]
            scores = np.atleast_1d(scores)
            exp_scores = np.exp(scores - np.max(scores))
            softmax = exp_scores / exp_scores.sum()
            class_order = list(self.svm.classes_)
            confidence = float(softmax[class_order.index(predicted_index)])

        class_name = self.index_to_name.get(predicted_index, str(predicted_index))
        display_label = DISPLAY_NAMES.get(class_name, class_name.title())

        return display_label, confidence


model_bundle = ModelBundle()
