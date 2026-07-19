from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from datetime import datetime
from backend.database import Base

class MatchPrediction(Base):
    __tablename__ = "match_predictions"
    id = Column(Integer, primary_key=True, index=True)
    team_a = Column(String, nullable=False)
    team_b = Column(String, nullable=False)
    predicted_winner = Column(String, nullable=False)
    win_probability_a = Column(Float, nullable=False)
    win_probability_b = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class TravelItinerary(Base):
    __tablename__ = "travel_itineraries"
    id = Column(Integer, primary_key=True, index=True)
    departure_city = Column(String, nullable=False)
    arrival_city = Column(String, nullable=False)
    carbon_footprint_kg = Column(Float, nullable=False)
    travel_mode = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
