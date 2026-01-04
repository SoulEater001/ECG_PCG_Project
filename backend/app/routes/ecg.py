from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/ecg", tags=["ECG"])

@router.post("/detect")
async def detect_ecg(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "prediction": "Normal",
        "confidence": 0.93
    }
