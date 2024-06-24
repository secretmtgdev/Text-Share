from fastapi import FastAPI
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
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(router)
