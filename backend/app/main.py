from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ecg
from app.routes import pcg
from app.routes import hybrid

app = FastAPI(
    title="CardioDetect API",
    description="Backend for ECG & PCG Detection",
    version="1.0.0"
)

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ecg.router)
app.include_router(pcg.router)
app.include_router(hybrid.router)
@app.get("/")
def root():
    return {"message": "CardioDetect Backend Running"}
