from pydantic import BaseModel

class Property(BaseModel):
    name: str
    address: str
    city: str
    state: str
    country: str
    zip: int
    bedrooms: int
    bathrooms: int