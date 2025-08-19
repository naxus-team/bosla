from app.models.models import UserDB, ClientDB, DriverDB, VehicleDB
from app.database import SessionLocal
from app.utils.security import hash_password
from app.utils.security import verify_password
from datetime import datetime, timedelta
from jose import jwt
import uuid

def generate_client_id() -> str:
    return str(uuid.uuid4())

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # ساعة

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



# ---------------- Users ----------------
def get_all_users():
    db = SessionLocal()
    try:
        users = db.query(UserDB).all()
        return [{"id": u.id, "username": u.username, "email": u.email} for u in users]
    finally:
        db.close()
        
def create_user_service(user):
    db = SessionLocal()
    try:
        new_user = UserDB(
            email=user.email,
            password=hash_password(user.password),  # هنا بنشفر الباسورد
            username=user.username,
            client_id=generate_client_id()
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User created", "user": {"id": new_user.id, "username": new_user.username, "email": new_user.email}}
    finally:
        db.close()

def login_user(email: str, password: str):
    db = SessionLocal()
    try:
        user = db.query(UserDB).filter(UserDB.email == email).first()
        if not user:
            return {"error": "User not found"}
        
        if verify_password(password, user.password):
            # هنا هتولّد التوكن
            access_token = create_access_token(data={"sub": str(user.id)})
            
            return {
                "message": "Login successful",
                "user": {"id": user.id, "username": user.username, "email": user.email},
                "access_token": access_token,
                "token_type": "bearer"
            }
        else:
            return {"error": "Invalid password"}
    finally:
        db.close()
        
def get_user_profile(username: str):
    db = SessionLocal()
    try:
        user = db.query(UserDB).filter(UserDB.username == username).first()
        
        if not user:
            return {"error": "User not found"}
        return {"message": "Login successful", "user": {"id": user.id, "username": user.username, "email": user.email}}

    finally:
        db.close()

# ---------------- Clients ----------------
def get_all_clients():
    db = SessionLocal()
    try:
        clients = db.query(ClientDB).all()
        return [{"id": c.id, "first_name": c.first_name, "last_name": c.last_name, "user_id": c.user_id} for c in clients]
    finally:
        db.close()

def create_client_service(client):
    db = SessionLocal()
    try:
        new_client = ClientDB(
            user_id=client.user_id,
            first_name=client.first_name,
            last_name=client.last_name,
            phone_number=client.phone_number,
            image=client.image,
            bio=client.bio
        )
        db.add(new_client)
        db.commit()
        db.refresh(new_client)
        return {"message": "Client created", "client": {"id": new_client.id, "first_name": new_client.first_name, "last_name": new_client.last_name}}
    finally:
        db.close()

# ---------------- Drivers ----------------
def get_all_drivers():
    db = SessionLocal()
    try:
        drivers = db.query(DriverDB).all()
        return [{"id": d.id, "first_name": d.first_name, "last_name": d.last_name, "vehicle_id": d.vehicle_id} for d in drivers]
    finally:
        db.close()

def create_driver_service(driver):
    db = SessionLocal()
    try:
        new_driver = DriverDB(
            user_id=driver.user_id,
            first_name=driver.first_name,
            last_name=driver.last_name,
            vehicle_id=driver.vehicle_id
        )
        db.add(new_driver)
        db.commit()
        db.refresh(new_driver)
        return {"message": "Driver created", "driver": {"id": new_driver.id, "first_name": new_driver.first_name, "last_name": new_driver.last_name}}
    finally:
        db.close()

# ---------------- Vehicles ----------------
def get_all_vehicles():
    db = SessionLocal()
    try:
        vehicles = db.query(VehicleDB).all()
        return [{"id": v.id, "make": v.make, "model": v.model, "plate_number": v.plate_number} for v in vehicles]
    finally:
        db.close()

def create_vehicle_service(vehicle):
    db = SessionLocal()
    try:
        new_vehicle = VehicleDB(
            user_id=vehicle.user_id,
            make=vehicle.make,
            model=vehicle.model,
            year=vehicle.year,
            plate_number=vehicle.plate_number,
            color=vehicle.color,
            capacity=vehicle.capacity,
            status=vehicle.status
        )
        db.add(new_vehicle)
        db.commit()
        db.refresh(new_vehicle)
        return {"message": "Vehicle created", "vehicle": {"id": new_vehicle.id, "make": new_vehicle.make, "model": new_vehicle.model}}
    finally:
        db.close()
