from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.models.models import UserDB, ClientDB, DriverDB, VehicleDB
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.services import crud
from app.schemas import schemas
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# السماح للـ React app بالوصول
origins = [
    "http://localhost:3000",
    "http://192.168.1.2:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # قائمة الدومينات المسموح بها
    allow_credentials=True,  # مهم لو بتستخدم الكوكيز
    allow_methods=["*"],     # السماح بكل الـ HTTP methods
    allow_headers=["*"],     # السماح بكل الهيدرز
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = "your-secret-key"

# ---------------- Users ----------------
@app.get("/v1/users")
def read_users():
    return crud.get_all_users()

@app.post("/v1/users")
def create_user(user: schemas.UserCreate):
    return crud.create_user_service(user)

@app.post("/v1/login")
def login(user: schemas.UserLogin):
    return crud.login_user("raff@bosla.com", "123456")

@app.post("/v1/register")
def register(user: schemas.UserCreate):
    return crud.create_user_service(user)

@app.get("/v1/auth")
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return {"status": True, "user": payload}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/user/{username}")
def get_user_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.username == username).first()
    
    if not user:
        return {"error": "User not found"}
    
    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }

# ---------------- Clients ----------------
@app.get("/v1/clients")
def read_clients():
    return crud.get_all_clients()

@app.post("/v1/clients")
def create_client(client: schemas.ClientCreate):
    return crud.create_client_service(client)

# ---------------- Drivers ----------------
@app.get("/v1/drivers")
def read_drivers():
    return crud.get_all_drivers()

@app.post("/v1/drivers")
def create_driver(driver: schemas.DriverCreate):
    return crud.create_driver_service(driver)

# ---------------- Vehicles ----------------
@app.get("/v1/vehicles")
def read_vehicles():
    return crud.get_all_vehicles()

@app.post("/v1/vehicles")
def create_vehicle(vehicle: schemas.VehicleCreate):
    return crud.create_vehicle_service(vehicle)


if __name__ == "__main__":
    app.run(host="192.168.1.2", port=8000)