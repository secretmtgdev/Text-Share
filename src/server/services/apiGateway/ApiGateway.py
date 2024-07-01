from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import dotenv_values
from pymongo import MongoClient
from contextlib import asynccontextmanager

from Routes import router
import certifi

config = dotenv_values(".env")

async def connectToMongo():
    db = MongoClient(config["ATLAS_URI"], tlsCAFile=certifi.where())
    return db

@asynccontextmanager
async def lifespan(app: FastAPI):
    dbHost = await connectToMongo()
    app.UserLogin = dbHost.TextShare.UserLogin
    app.LogData = dbHost.TextShare.LogData
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(router)

origins = [
    "http://localhost:5000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)
