import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from backend.main import app
from backend.database import engine, Base

@pytest_asyncio.fixture(autouse=True)
async def setup_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest_asyncio.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_predict_endpoint_validation(client):
    # Valid Request
    response = await client.post("/api/predict", json={"team_a": "ARG", "team_b": "ESP"})
    assert response.status_code == 200
    data = response.json()
    assert data["team_a"] == "ARG"
    assert data["team_b"] == "ESP"
    assert "predicted_winner" in data

    # Invalid Request (unqualified country code)
    response_fail = await client.post("/api/predict", json={"team_a": "XYZ", "team_b": "ESP"})
    assert response_fail.status_code == 422

@pytest.mark.asyncio
async def test_travel_endpoint(client):
    # Valid Travel Request
    response = await client.post("/api/travel", json={
        "departure_city": "New York",
        "arrival_city": "Los Angeles",
        "travel_mode": "flight"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["carbon_footprint_kg"] > 0
    assert data["travel_mode"] == "flight"
