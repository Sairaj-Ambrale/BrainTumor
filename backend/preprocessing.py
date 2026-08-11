"""
Replicates the exact preprocessing pipeline from
Brain_Tumor_Classification.ipynb so predictions match what the
notebook produced during training:

  read image -> resize(128,128) -> grayscale -> HOG features
  -> StandardScaler -> PCA

Any change here must be mirrored in the notebook (and vice versa),
or the SVM will receive out-of-distribution features.
"""
import cv2
import numpy as np
from skimage.feature import hog

from config import IMAGE_SIZE, HOG_PARAMS


class PreprocessError(ValueError):
    """Raised when an uploaded file can't be decoded/processed as an image."""


def decode_image(file_bytes: bytes) -> np.ndarray:
    """Decode raw uploaded bytes into a BGR image array, like cv2.imread."""
    arr = np.frombuffer(file_bytes, dtype=np.uint8)
    image = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if image is None:
        raise PreprocessError(
            "Could not decode this file as an image. Make sure it's a valid JPG or PNG."
        )
    return image


def extract_features(image: np.ndarray) -> np.ndarray:
    """Resize -> grayscale -> HOG, returning a single feature vector."""
    resized = cv2.resize(image, IMAGE_SIZE)
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
    features = hog(gray, **HOG_PARAMS)
    return features


def preprocess_image_bytes(file_bytes: bytes) -> np.ndarray:
    """
    Full pipeline from raw upload bytes to a (1, n_features) HOG feature
    vector, ready to be passed through the saved scaler + PCA.
    """
    image = decode_image(file_bytes)
    features = extract_features(image)
    return features.reshape(1, -1)
