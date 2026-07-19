from pydantic import BaseModel, Field, field_validator, ConfigDict
from datetime import datetime
from typing import Optional

class PredictionRequest(BaseModel):
    team_a: str = Field(..., min_length=2, max_length=50)
    team_b: str = Field(..., min_length=2, max_length=50)

    @field_validator('team_a', 'team_b')
    @classmethod
    def validate_team_codes(cls, v: str) -> str:
        v_upper = v.upper()
        # Qualified nations code check
        valid_countries = {"ARG", "ESP", "USA", "MEX", "CAN", "FRA", "GER", "BRA", "ENG", "ITA"}
        if v_upper not in valid_countries:
            raise ValueError(f"Team code must be a valid qualified nation code (e.g. ARG, ESP, USA, MEX, CAN). Got: {v}")
        return v_upper

class PredictionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    team_a: str
    team_b: str
    predicted_winner: str
    win_probability_a: float
    win_probability_b: float
    created_at: datetime

class TravelRequest(BaseModel):
    departure_city: str
    arrival_city: str
    travel_mode: str = Field(..., pattern="^(flight|train|bus)$")

    @field_validator('departure_city', 'arrival_city')
    @classmethod
    def validate_host_cities(cls, v: str) -> str:
        # Validate North American host cities
        valid_cities = {"New York", "Los Angeles", "Mexico City", "Toronto", "Vancouver", "Dallas", "Miami"}
        if v not in valid_cities:
            raise ValueError("City must be a qualified North American host city.")
        return v

class TravelResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    departure_city: str
    arrival_city: str
    carbon_footprint_kg: float
    travel_mode: str
    created_at: datetime
