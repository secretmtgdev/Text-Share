"""
    Backbone for the Kafka notification service.

    @version 1.0.0
    @author Michael Wilson
"""
from kafka.admin import KafkaAdminClient, NewTopic
from kafka import KafkaConsumer
from flask import Flask, request
from flask_cors import CORS
from kafka import KafkaProducer

import json
import sys
sys.path.append('../')

from Constants import TopicType
import json
import asyncio
from websockets.server import serve
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("connect")
def connected():
    print(request.sid)
    print("client has connected")
    emit("connected", {
        "data": f"id: {request.sid} is connected"
    })

@socketio.on("data")
def handle_message(data):
    print("data from the front end: ", str(data))
    emit("dataReceived", {
            "data": data,
            "id": request.sid
        }, broadcast=True
    )

@socketio.on("disconnect")
def disconnected():
    print("user disconnected")
    emit("disconnect", f"user: {request.sid} disconnected", broadcast=True)

socketio.run(app, debug=True, port=5001)

# f = open("NotificationConfig.json")
# data = json.load(f)

# kafka_config = data["kafka"]
# kakfa_topics = kafka_config["topics"]
# kafka_producer = kafka_config["producer"]
# bootstrap_servers = kafka_config["bootstrap_servers"]
# api_version = kafka_config["api_version"]
# sms_consumer = KafkaConsumer(kakfa_topics[TopicType.SMS], bootstrap_servers=bootstrap_servers, api_version=api_version)
# email_consumer = KafkaConsumer(kakfa_topics[TopicType.EMAIL], bootstrap_servers=bootstrap_servers, api_version=api_version)

# def CreateKafkaTopics():
#     admin_client = KafkaAdminClient(
#         bootstrap_servers=bootstrap_servers,
#         api_version=(2, 8, 0) # this must be a tuple and not an API version string
#     )

#     topics = []
#     current_topics = set(admin_client.list_topics())
#     for topic in kakfa_topics:
#         if topic not in current_topics:
#             topics.append(NewTopic(name=topic, num_partitions=1, replication_factor=1))
    
#     if len(topics) > 1:
#         print(f'CREATING TOPICS: {topics}')
#         admin_client.create_topics(new_topics=topics, validate_only=False)

# def PrintConsumerMessages(consumer):
#     for msg in consumer:
#         print(msg)

# CreateKafkaTopics()

# """
#     Runs a job on the consumers to determine if there are new messages

#     @param websocket
#     @param path
# """
# async def socketHanlder(websocket):
#     data = await websocket.recv()
#     reply = f"Data received as: {data}"
#     PrintConsumerMessages(sms_consumer)
#     await websocket.send(reply)

# socket_config = data["socket"]
# async def main():
#     async with serve(socketHanlder, socket_config["host"], socket_config["port"]):
#         await asyncio.Future()

# asyncio.run(main())

# # start_server = websockets.serve(socketHanlder, socket_config["host"], socket_config["port"])
# # asyncio.get_event_loop().run_until_complete(start_server)
# # asyncio.get_event_loop().run_forever()
