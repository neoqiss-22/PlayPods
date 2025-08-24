from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="PlayPods Recommendation Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "recommendation-service",
        "version": "1.0.0"
    }

@app.get("/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    # TODO: Implement recommendation logic
    return {
        "user_id": user_id,
        "recommendations": [
            {"video_id": "1", "score": 0.95},
            {"video_id": "2", "score": 0.87},
            {"video_id": "3", "score": 0.82}
        ]
    }

@app.post("/recommendations/train")
async def train_model():
    # TODO: Implement model training
    return {"message": "Model training initiated"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 3006)),
        reload=True
    )
