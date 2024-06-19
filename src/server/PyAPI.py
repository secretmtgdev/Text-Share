from flask import Flask, request, jsonify
from flask_cors import CORS

from PostgresHelpers import getFileFromDataStore, uploadToDataStore, insertFile, getAllFiles, deleteFromDataStore

app = Flask(__name__)
CORS(app)

@app.route('/file', methods=['GET', 'POST', 'DELETE'])
def handleFile():
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
