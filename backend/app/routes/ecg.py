from fastapi import APIRouter, UploadFile, File
import os
from fastapi.responses import JSONResponse
# from app.services.ecg_pipeline import load_model, ecgInference
import random

router = APIRouter(prefix="/ecg", tags=["ECG"])

# model = load_model()
# inference = ecgInference(model)


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
async def detect_pcg(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    try:
        # result = inference.predict(temp_path)
        # return JSONResponse(result)
        result = random.choice(accumulation)
        return JSONResponse(content=result)
    finally:
        os.remove(temp_path)