from pydantic import BaseModel
from typing import Optional, Dict, Any

class Property(BaseModel):
    name: str
    address: str
    city: str
    state: str
    country: str
    zip: int
    bedrooms: int
    bathrooms: int
    details: Optional[Dict[str, Any]] = None