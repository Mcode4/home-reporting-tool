from pathlib import Path

env_path = Path(__file__).resolve().parents[1] # / ".env"
print("Looking for .env at:", env_path)