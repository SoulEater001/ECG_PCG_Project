from fastapi import APIRouter, UploadFile, File
import os
from fastapi.responses import JSONResponse
# from app.services.hybrid_pipeline import load_model, HybridInference
import random

router = APIRouter(prefix="/hybrid", tags=["Hybrid"])

# model = load_model()
# inference = HybridInference(model)

accumulation = [
    {
        "predicted_class": "Normal",
        "confidence": 0.94,
        "probabilities": {
            "Normal": 0.94,
            "Abnormal": 0.06
        }
    },
    {
        "predicted_class": "Abnormal",
        "confidence": 0.88,
        "probabilities": {
            "Normal": 0.12,
            "Abnormal": 0.88
        }
    },
    {
        "predicted_class": "Normal",
        "confidence": 0.76,
        "probabilities": {
            "Normal": 0.76,
            "Abnormal": 0.24
        }
    },
    {
        "predicted_class": "Abnormal",
        "confidence": 0.67,
        "probabilities": {
            "Normal": 0.33,
            "Abnormal": 0.67
        }
    },
    {
        "predicted_class": "Normal",
        "confidence": 0.55,
        "probabilities": {
            "Normal": 0.55,
            "Abnormal": 0.45
        }
    }
]

@router.post("/detect")
async def detect_hybrid(
    ecg: UploadFile = File(...),
    pcg: UploadFile = File(...)
):
    ecg_path = f"temp_ecg_{ecg.filename}"
    pcg_path = f"temp_pcg_{pcg.filename}"

    with open(ecg_path, "wb") as f:
        f.write(await ecg.read())

    with open(pcg_path, "wb") as f:
        f.write(await pcg.read())

    try:
        result = random.choice(accumulation)
        return JSONResponse(content=result)
    finally:
        os.remove(ecg_path)
        os.remove(pcg_path)