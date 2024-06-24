from fastapi import APIRouter, Request, Body
from models.loginModels import Login
from datetime import datetime, timedelta

router = APIRouter(prefix="", tags=['TextShare'])

def setThrottled(db, username, isThrottled):
    db.update_one(
        { "username": username },
        { "$set": {
            "isThrottled": isThrottled
        }}
    )

def setThrottledTime(db, username, date):
    db.update_one(
        { "username": username },
        { "$set": {
            "throttleTime": date
        }}
    )

def unsetThrottledTime(db, username):
    db.update_one(
        { "username": username },
        { "$unset": {
            "throttleTime": ""
        }}
    )

def canRetry(lastThrottleTime):
    minutesPassed = (datetime.now() - lastThrottleTime) / timedelta(minutes=1)
    return minutesPassed > 30

def resetLoginData(db, username):
    db.update_one(
        { "username": username },
        {
            "$unset": {
                "throttleTime": ""
            },
            "$set": {
                "isThrottled": False,
                "failedAttempts": 0
            }
        }
    )

@router.get("/user/{username}")
async def getUserLoginAttempts(request: Request, username):
    db = request.app.UserLogin
    response = db.find_one({ "username": username })
    if not response:
        return 0
    else:
        if response['failedAttempts'] >= 4:
            setThrottled(db, username, True)

            if 'throttleTime' not in response:
                setThrottledTime(db, username, datetime.now())
            elif canRetry(response['throttleTime']):
                resetLoginData(db, username)

        return response['failedAttempts']

@router.post("/user")
async def addUserLoginAttempt(request: Request, login: Login = Body(...)):
    db = request.app.UserLogin
    response = db.insert_one(login.model_dump())
    return {
        "id": str(response.inserted_id)
    }

@router.put("/user/{username}")
async def updateUserLoginAttempt(request: Request, username):
    db = request.app.UserLogin
    response = db.update_one(
        { "username": username },
        { "$inc": { "failedAttempts": 1 } }
    )
    return {
        "updated_count": response.modified_count
    }