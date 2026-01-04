# 🫀 ECG & PCG Abnormality Detection System

## 📌 Overview
This project is a **full-stack medical signal analysis system** designed to detect abnormalities in **heart signals** using **deep learning**.

It supports:
- **PCG (Phonocardiogram)** — heart sounds
- **ECG (Electrocardiogram)** — electrical activity of the heart

The system converts biomedical signals into image representations (Mel-spectrograms / ECG plots) and uses a **CNN-based model (MobileNetV2)** to classify signals as **Normal** or **Abnormal**.

---

## 🏗 System Architecture

User (Browser)
↓
Next.js Frontend (Upload ECG / PCG)
↓
FastAPI Backend (Inference API)
↓
Signal Preprocessing (Filtering, Resampling)
↓
Image Conversion (Mel-Spectrogram / ECG Image)
↓
CNN Model (MobileNetV2)
↓
Prediction + Confidence

---

## ⚙️ Tech Stack

### Frontend
- **Next.js (React)**
- Tailwind CSS
- File upload UI
- Real-time prediction display

### Backend
- **FastAPI**
- PyTorch
- Librosa (audio processing)
- SciPy (signal processing)
- WFDB (PhysioNet ECG/PCG support)

### Deep Learning
- **MobileNetV2**
- Input: Mel-spectrogram images (PCG) / ECG images
- Output: Binary classification

---

## 🧠 Model Details

### PCG Model
- Input: PCG audio (`.wav`, PhysioNet `.dat/.hea`)
- Representation: **Mel-Spectrogram**
- Architecture: **MobileNetV2**
- Classes:
  - `0 → Abnormal`
  - `1 → Normal`

### ECG Analysis
- Supports ECG waveform loading (WFDB / image-based analysis)
- ECG visualization and classification support (extendable)

📁 Trained model included:
- models/mobilenet_pcg.pth

---

## 📂 Project Structure

pcg-ecg-project/
├── frontend/ # Next.js frontend
│ └── src/
├── backend/ # FastAPI backend
│ └── app/
│ ├── routes/
│ ├── services/
│ └── main.py
├── models/ # Trained ML models
│ └── mobilenet_pcg.pth
├── README.md # Root documentation
└── .gitignore

---

## 🚀 How to Run the Project

### 1️⃣ Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
python run.py
```
#### Backend runs at:
http://localhost:8000

### 2️⃣ Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```
#### Fronted runs at:
http://localhost:3000


## API Endpoints
PCG Detection
POST /pcg/detect

ECG Detection
POST /ecg/detect

## Input:

PCG audio file (.wav)
ECG audio file (.wav)

📊 Features

✅ ECG & PCG signal handling
✅ Biomedical signal preprocessing
✅ Mel-spectrogram generation
✅ Deep learning inference
✅ REST API integration
✅ Interactive frontend UI
✅ Confidence & probability reporting


## Dataset Sources

PhysioNet

PCG: PhysioNet Heart Sound Databases

ECG: MIT-BIH Arrhythmia Database


## Academic Use

This project is developed as part of a B.Tech Final Year / Minor Project in Computer Science / AI / ML.

⚠️ Disclaimer:
This system is for educational and research purposes only and must not be used for clinical diagnosis.

## Author

Nitin Dewangan
Shivam Kumar Dewangan
B.Tech – Computer Science Engineering
Government Engineering College, Raipur

## License

This project is intended for academic use only.