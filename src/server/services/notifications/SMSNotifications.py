from twilio.rest import Client
import json

f = open("NotificationConfig.json")
data = json.load(f)
twilio = data["twilio"]
twilio_number = twilio["phone_number"]
account_id = twilio["account_id"]
auth_token = twilio["auth_token"]

client = Client(account_id, auth_token)

def sendSMSNotifcation(receiver, body):
    message = client.messages.create(
        from_=twilio_number,
        body=body,
        to=receiver,
    )

    print(message.sid)

sendSMSNotifcation(twilio["test"]["phone_number"], twilio["test"]["body"])

f.close()