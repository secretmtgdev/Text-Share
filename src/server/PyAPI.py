from flask import Flask, request
from flask_cors import CORS
from kafka import KafkaProducer

from PostgresHelpers import getFileFromDataStore, uploadToDataStore, insertFile, getAllFiles, deleteFromDataStore

import json

app = Flask(__name__)
CORS(app)
f = open("./notifications/NotificationConfig.json")
data = json.load(f)
kafka_config = data["kafka"]
kafka_producer = kafka_config["producer"]
producer = KafkaProducer(
    bootstrap_servers=kafka_config["boostrap_servers"],
    client_id=kafka_producer["flask_client_id"],
    api_version=(kafka_config["api_version"])
)

@app.route('/file', methods=['GET', 'POST', 'DELETE'])
def handleFile():
    for topic in kafka_config["topics"]:
        producer.send(topic, "TEST MESSAGE")

    match request.method:
        case 'POST':
            file = request.files.get('file')
            return uploadFile(file)
        
        case 'GET':
            return getFileFromDataStore(request.args.get('fileName'));

        case 'DELETE':
            return deleteFile(request.get_json()['fileName'])

def uploadFile(file_to_upload):
    uploadToDataStore(file_to_upload)
    file_id = insertFile(fileName=file_to_upload.filename)
    return f"<h1>{file_id}</h1>"

def deleteFile(file_to_delete):
    deleteFromDataStore(file_to_delete)
    return {
        'success': 200
    }

@app.route('/files', methods=['GET', 'POST'])
def handleFiles():
    if request.method == 'GET':
        return getFiles()    


def getFiles():
    fileNames = getAllFiles()
    return {
        'fileNames': fileNames
    }
