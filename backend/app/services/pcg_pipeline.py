import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import librosa
import librosa.display
import cv2
import matplotlib.pyplot as plt

from scipy.signal import butter, filtfilt, resample
from PIL import Image
from torchvision import models, transforms

from app.utils.pcg_labels import IDX_TO_LABEL

# ================= CONFIG =================
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "models/best_pcg_model.pth"
IMG_SIZE = 256
TARGET_FS = 1000
# ==========================================


class PCGPreprocessor:
    def __init__(self, target_fs=1000, lowcut=20, highcut=400, order=4):
        self.target_fs = target_fs
        self.lowcut = lowcut
        self.highcut = highcut
        self.order = order

    def load_audio(self, path):
        signal, sr = librosa.load(path, sr=None)
        return signal, sr

    def bandpass_filter(self, signal, fs):
        nyq = 0.5 * fs
        low = self.lowcut / nyq
        high = self.highcut / nyq
        b, a = butter(self.order, [low, high], btype="band")
        return filtfilt(b, a, signal)

    def normalize(self, signal):
        signal -= np.mean(signal)
        return signal / (np.max(np.abs(signal)) + 1e-8)

    def resample(self, signal, fs):
        if fs == self.target_fs:
            return signal
        n = int(len(signal) * self.target_fs / fs)
        return resample(signal, n)

    def preprocess(self, path):
        signal, fs = self.load_audio(path)
        signal = self.bandpass_filter(signal, fs)
        signal = self.normalize(signal)
        signal = self.resample(signal, fs)
        return signal


class PCGImageConverter:
    def __init__(self, fs=1000, img_size=(256, 256)):
        self.fs = fs
        self.img_size = img_size

    def to_melspectrogram(self, signal):
        mel = librosa.feature.melspectrogram(
            y=signal,
            sr=self.fs,
            n_mels=128,
            fmax=500,
            hop_length=128,
            n_fft=512
        )

        mel_db = librosa.power_to_db(mel, ref=np.max)
        mel_norm = (mel_db - mel_db.min()) / (mel_db.max() - mel_db.min() + 1e-8)

        fig = plt.figure(figsize=(2.56, 2.56), dpi=100)
        ax = plt.Axes(fig, [0, 0, 1, 1])
        ax.axis("off")
        fig.add_axes(ax)

        librosa.display.specshow(mel_norm, cmap="magma", ax=ax)

        fig.canvas.draw()
        img = np.frombuffer(fig.canvas.buffer_rgba(), dtype=np.uint8)
        img = img.reshape(fig.canvas.get_width_height()[::-1] + (4,))[:, :, :3]
        plt.close(fig)

        return cv2.resize(img, self.img_size)


def load_model():
    model = models.mobilenet_v2(pretrained=False)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, 2)
    model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
    model.to(DEVICE)
    model.eval()
    return model


class PCGInference:
    def __init__(self, model):
        self.model = model
        self.preprocessor = PCGPreprocessor(TARGET_FS)
        self.converter = PCGImageConverter(TARGET_FS, (IMG_SIZE, IMG_SIZE))

        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

    def predict(self, audio_path):
        signal = self.preprocessor.preprocess(audio_path)
        img = self.converter.to_melspectrogram(signal)

        tensor = self.transform(Image.fromarray(img)).unsqueeze(0).to(DEVICE)

        with torch.no_grad():
            out = self.model(tensor)
            probs = F.softmax(out, dim=1)
            conf, pred = torch.max(probs, 1)

        pred_idx = pred.item()

        return {
            "predicted_class": IDX_TO_LABEL[pred_idx],
            "confidence": float(conf.item()),
            "probabilities": {
                IDX_TO_LABEL[i]: float(probs[0, i])
                for i in range(2)
            }
        }
