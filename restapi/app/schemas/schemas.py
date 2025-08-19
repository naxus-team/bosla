from pydantic import BaseModel
from typing import Optional

# ---------------- Users ----------------
class UserCreate(BaseModel):
    email: str
    password: str
    username: str
    
# ---------------- User Login ----------------
class UserLogin(BaseModel):
    email: str
    password: str
    
class UserProfile(BaseModel):
    username: str
    
    
# ---------------- Clients ----------------
class ClientCreate(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    phone_number: Optional[str] = None
    image: Optional[str] = None
    bio: Optional[str] = None

# ---------------- Drivers ----------------
class DriverCreate(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    vehicle_id: Optional[int] = None

# ---------------- Vehicles ----------------
class VehicleCreate(BaseModel):
    user_id: int
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    plate_number: Optional[str] = None
    color: Optional[str] = None
    capacity: Optional[int] = None
    status: Optional[str] = "active"
