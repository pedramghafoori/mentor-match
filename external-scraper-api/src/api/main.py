from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="MentorMatch Certification Scraper API",
    description="API for scraping and verifying mentor certifications",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Certification(BaseModel):
    id: str
    name: str
    issuer: str
    date: str
    expiry_date: Optional[str] = None

class VerificationResponse(BaseModel):
    isValid: bool
    details: Optional[dict] = None

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/certifications/{lss_id}", response_model=List[Certification])
async def get_certifications(lss_id: str):
    """
    Fetch certifications for a given LSS ID.
    This is a mock implementation. In production, this would scrape the actual certification data.
    """
    try:
        # Mock data for demonstration
        # In production, this would call the actual scraper
        mock_certifications = [
            {
                "id": "cert-001",
                "name": "Advanced Leadership",
                "issuer": "Leadership Institute",
                "date": "2022-01-15",
                "expiry_date": "2025-01-15"
            },
            {
                "id": "cert-002",
                "name": "Professional Coaching",
                "issuer": "International Coaching Federation",
                "date": "2021-06-20",
                "expiry_date": None
            }
        ]
        return mock_certifications
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/certifications/{lss_id}/verify/{certification_id}", response_model=VerificationResponse)
async def verify_certification(lss_id: str, certification_id: str):
    """
    Verify a specific certification for a given LSS ID.
    This is a mock implementation. In production, this would verify against the actual certification database.
    """
    try:
        # Mock verification
        # In production, this would verify against the actual certification database
        return {
            "isValid": True,
            "details": {
                "verified_at": "2023-01-01T12:00:00Z",
                "verification_method": "database_check"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 