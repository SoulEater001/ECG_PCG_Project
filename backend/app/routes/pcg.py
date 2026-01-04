from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/pcg", tags=["PCG"])

@router.post("/detect")
async def detect_pcg(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "prediction": "Abnormal",
        "confidence": 0.87
    }
