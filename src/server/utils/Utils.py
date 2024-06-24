import requests

async def userIsThrottled(username):
    try:
        request = requests.get(f"http://127.0.0.1:8000/user/{username}")
        return int(request.content) > 5
    except Exception as error:
        print(error.content)
        return False


async def incrementFailedAttempt(username):
    try:
        requests.put(f"http://127.0.0.1:8000/user/{username}")
    except Exception as error:
        print(error.content)

async def addUserLogin(username):
    requestData = {
        "username": username,
        "failedAttempts": 0,
        "isThrottled": False,
        "throttleTime": None
    }

    headers = { "Content-Type": "application/json" }
    try:
        requests.post("http://127.0.0.1:8000/user", headers=headers, json=requestData)
    except Exception as error:
        print(error.content)