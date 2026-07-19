# FIFA World Cup 2026 Project Template & Architecture Summary
This blueprint defines the architecture, directory structure, testing rules, and cloud deployment steps for the **FIFA World Cup 2026 Match Predictor & Fan Travel Planner** application. 
It highlights the exact solutions to deployment and testing errors encountered in previous iterations, preventing the next AI session from repeating them.
---
## 1. Directory Structure
```
├── backend/
│   ├── database.py       # Async SQLite connection using aiosqlite & SQLAlchemy 2.0
│   ├── models.py         # SQLAlchemy tables (e.g., MatchPrediction, TravelItinerary)
│   ├── schemas.py        # Pydantic input models (validators for scores, dates)
│   ├── calculator.py     # Pure calculations (e.g., Travel carbon estimator, match points)
│   ├── gemini_service.py # Async Gemini API model calls with structured output & heuristics fallback
│   └── main.py           # FastAPI application, CORS configs, routers, and SPA host
├── frontend/
│   └── index.html        # Accessible HTML5 SPA (standings, predictor form, Tailwind glassmorphism)
├── tests/
│   └── test_main.py      # Async test suite (Pydantic validation checks, mock AI fallbacks)
├── Dockerfile            # Port 8080 optimized slim Python container for Cloud Run
├── requirements.txt      # FastAPI, uvicorn, SQLAlchemy, aiosqlite, httpx, pytest-asyncio
└── README.md             # Developer documentation
```
---
## 2. Adaptation for FIFA World Cup 2026
- **Backend Logic (`backend/calculator.py` & schemas)**:
  - Predictor input validations: Verify scores are non-negative integers (`ge=0`), and team inputs are restricted to valid qualified country codes.
  - Travel carbon calculations: Estimate transit footprint between North American host cities (Canada, USA, Mexico).
- **Gemini AI Service (`backend/gemini_service.py`)**:
  - Request predictions analysis, group standing calculations, or hyper-localized match-day travel safety tips.
  - Fallback logic: Returns standard static match predictions (e.g. historical head-to-head outcomes) if the Gemini API key is missing or calls time out.
- **Frontend Dashboard (`frontend/index.html`)**:
  - Accessible scheduling board using ARIA-live announcers to read score predictions and group status updates.
  - Keyboard-navigable match scheduler with clear focus rings.
---
## 3. Past Deployment & Testing Issues (Critical Lessons Learned)
### Lesson 1: Cloud Run Deployment - IAM Service Account Storage Permission
- **The Problem**: Running `gcloud run deploy --source .` failed with `PERMISSION_DENIED: Build failed because the default service account is missing required IAM permissions`. The default Compute Engine service account (`<project-number>-compute@developer.gserviceaccount.com`) lacked access to the deployment Cloud Storage bucket to read the uploaded source zip file.
- **The Solution**: Before deploying, verify and grant the `roles/storage.admin` permission to the service account.
- **Exact Command**:
  ```bash
  gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --role="roles/storage.admin"
  ```
### Lesson 2: GitHub Push - Authentication Failures
- **The Problem**: Pushing directly via `git push origin main` failed with `Authentication failed` because GitHub no longer supports password authentication over HTTPS.
- **The Solution**: Install the GitHub CLI (`gh`), authenticate using browser login, and push the repository.
- **Step-by-step commands**:
  1. Install GitHub CLI:
     ```powershell
     winget install --id GitHub.cli --exact --silent --accept-source-agreements --accept-package-agreements
     ```
  2. Authenticate the session (opens browser and generates code):
     ```powershell
     & "C:\Program Files\GitHub CLI\gh.exe" auth login --git-protocol https --web
     ```
  3. Create repository (if needed) and push:
     ```powershell
     git remote add origin https://github.com/<username>/<repo>.git
     git push -u origin main
     ```
### Lesson 3: Async Testing - Pytest-Asyncio & Modern HTTPX Client Setup
- **The Problem 1**: Async fixtures declared with `@pytest.fixture` triggered deprecation warnings or failed to resolve.
  - **Solution**: Always use `@pytest_asyncio.fixture` for async fixtures.
- **The Problem 2**: Passing `app=app` directly inside `httpx.AsyncClient` raised `TypeError: __init__() got an unexpected keyword argument 'app'`.
  - **Solution**: Modern HTTPX requires instantiating the ASGI transport explicitly.
  - **Correct Setup in `tests/test_main.py`**:
    ```python
    import pytest_asyncio
    from httpx import AsyncClient, ASGITransport
    from backend.main import app
    @pytest_asyncio.fixture
    async def client():
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            yield ac
    ```
---
## 4. Deploying to Google Cloud Run (Deployment Steps)
1. Ensure the Google Cloud SDK is installed (`gcloud --version`).
2. Run deployment command (replace `<project_id>` with actual project ID):
   ```bash
   gcloud run deploy fifa-tracker \
     --source . \
     --project <project_id> \
     --region us-central1 \
     --allow-unauthenticated
   ```
3. Set the Gemini API key as an environment variable in Cloud Run:
   ```bash
   gcloud run services update fifa-tracker \
     --set-env-vars="GEMINI_API_KEY=YOUR_API_KEY" \
     --project <project_id> \
     --region us-central1
   ```
