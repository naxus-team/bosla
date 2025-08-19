from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import declarative_base, relationship
import datetime
import uuid

Base = declarative_base()

# ---------------- Users ----------------
class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(Text, nullable=False)
    username = Column(String(100), nullable=False)
    client_id = Column(String(36), nullable=True, default=lambda: str(uuid.uuid4()))
    date_created = Column(DateTime, default=datetime.datetime.utcnow)

    client = relationship("ClientDB", back_populates="user", uselist=False)
    drivers = relationship("DriverDB", back_populates="user")
    vehicles = relationship("VehicleDB", back_populates="user")


# ---------------- Clients ----------------
class ClientDB(Base):
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone_number = Column(String(20))
    image = Column(Text)
    bio = Column(Text)
    date_created = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("UserDB", back_populates="client")


# ---------------- Drivers ----------------
class DriverDB(Base):
    __tablename__ = "drivers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))

    user = relationship("UserDB", back_populates="drivers")
    vehicle = relationship("VehicleDB", back_populates="driver")


# ---------------- Vehicles ----------------
class VehicleDB(Base):
    __tablename__ = "vehicles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    make = Column(String(50))
    model = Column(String(50))
    year = Column(Integer)
    plate_number = Column(String(20))
    color = Column(String(30))
    capacity = Column(Integer)
    status = Column(String(20), default="active")
    date_created = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("UserDB", back_populates="vehicles")
    driver = relationship("DriverDB", back_populates="vehicle", uselist=False)
