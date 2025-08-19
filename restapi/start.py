import uvicorn
from app.main import app
from app.models.user_model import Base
from app.database.db import engine

# إنشاء الجداول تلقائيًا لو مش موجودة
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)