from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# نموذج البيانات للـ POST
class HelloRequest(BaseModel):
    name: str

# GET endpoint
@app.get("/hello")
def get_hello():
    return {"message": "Hello Mr.Mohamed from GET endpoint!"}

# POST endpoint
@app.post("/hello")
def post_hello(data: HelloRequest):
    return {"message": f"Hello {data.name}"}


# PUSH endpoint