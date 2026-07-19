import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

async def get_gemini_prediction(team_a: str, team_b: str) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY missing. Using static heuristic fallback.")
        return get_heuristic_fallback(team_a, team_b)
    
    try:
        # Async Gemini model call integration
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"Analyze World Cup match between {team_a} and {team_b}. Predict winner and probabilities."
        response = await model.generate_content_async(prompt)
        
        text = response.text.upper()
        if team_a in text:
            winner = team_a
        elif team_b in text:
            winner = team_b
        else:
            winner = "DRAW"
            
        return {
            "predicted_winner": winner,
            "win_probability_a": 55.0,
            "win_probability_b": 45.0
        }
    except Exception as e:
        logger.error(f"Gemini API error: {e}. Falling back to heuristics.")
        return get_heuristic_fallback(team_a, team_b)

def get_heuristic_fallback(team_a: str, team_b: str) -> dict:
    # Standard static predictions based on historical rankings
    rankings = {
        "ARG": 1, "FRA": 2, "ENG": 3, "BRA": 4, "ESP": 5,
        "GER": 15, "USA": 11, "MEX": 14, "CAN": 45, "ITA": 9
    }
    
    rank_a = rankings.get(team_a, 20)
    rank_b = rankings.get(team_b, 20)
    
    if rank_a < rank_b:
        winner = team_a
        prob_a = 60.0
        prob_b = 40.0
    elif rank_b < rank_a:
        winner = team_b
        prob_a = 40.0
        prob_b = 60.0
    else:
        winner = "DRAW"
        prob_a = 50.0
        prob_b = 50.0
        
    return {
        "predicted_winner": winner,
        "win_probability_a": prob_a,
        "win_probability_b": prob_b
    }
