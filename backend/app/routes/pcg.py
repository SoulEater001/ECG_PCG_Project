from fastapi import APIRouter, UploadFile, File
import os
from fastapi.responses import JSONResponse
from app.services.pcg_pipeline import load_model, PCGInference

router = APIRouter(prefix="/pcg", tags=["PCG"])

model = load_model()
inference = PCGInference(model)

@router.post("/detect")
async def detect_pcg(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    try:
        result = inference.predict(temp_path)
        return JSONResponse(result)
    finally:
        os.remove(temp_path)