def calculate_carbon_footprint(departure: str, arrival: str, mode: str) -> float:
    # Coordinate distances mapping
    distances = {
        ("New York", "Los Angeles"): 3935.0,
        ("New York", "Mexico City"): 3360.0,
        ("New York", "Toronto"): 550.0,
        ("Los Angeles", "Mexico City"): 2490.0,
        ("Toronto", "Vancouver"): 3360.0,
        ("Dallas", "Mexico City"): 1500.0,
    }
    
    # Check both direction pairs
    distance = distances.get((departure, arrival)) or distances.get((arrival, departure)) or 1000.0
    
    # Emissions factor in kg CO2 per km
    factors = {
        "flight": 0.15,
        "train": 0.04,
        "bus": 0.05
    }
    
    factor = factors.get(mode.lower(), 0.1)
    return round(distance * factor, 2)

def calculate_match_points(score_a: int, score_b: int) -> tuple[int, int]:
    if score_a > score_b:
        return 3, 0
    elif score_b > score_a:
        return 0, 3
    else:
        return 1, 1
