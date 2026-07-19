from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
import os

from backend.database import get_db, init_db
from backend.schemas import PredictionRequest, PredictionResponse, TravelRequest, TravelResponse
from backend.models import MatchPrediction, TravelItinerary
from backend.calculator import calculate_carbon_footprint
from backend.gemini_service import get_gemini_prediction

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the database on startup
    await init_db()
    yield

app = FastAPI(title="FIFA World Cup 2026 Stadium Operations API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_match(request: PredictionRequest, db: AsyncSession = Depends(get_db)):
    prediction = await get_gemini_prediction(request.team_a, request.team_b)
    
    db_pred = MatchPrediction(
        team_a=request.team_a,
        team_b=request.team_b,
        predicted_winner=prediction["predicted_winner"],
        win_probability_a=prediction["win_probability_a"],
        win_probability_b=prediction["win_probability_b"]
    )
    db.add(db_pred)
    await db.commit()
    await db.refresh(db_pred)
    return db_pred

@app.post("/api/travel", response_model=TravelResponse)
async def log_travel(request: TravelRequest, db: AsyncSession = Depends(get_db)):
    carbon = calculate_carbon_footprint(request.departure_city, request.arrival_city, request.travel_mode)
    
    db_travel = TravelItinerary(
        departure_city=request.departure_city,
        arrival_city=request.arrival_city,
        carbon_footprint_kg=carbon,
        travel_mode=request.travel_mode
    )
    db.add(db_travel)
    await db.commit()
    await db.refresh(db_travel)
    return db_travel

# Host frontend SPA
if os.path.exists("./frontend"):
    app.mount("/", StaticFiles(directory="./frontend", html=True), name="static")
elif os.path.exists("./index.html"):
    app.mount("/static", StaticFiles(directory=".", html=True), name="static")
