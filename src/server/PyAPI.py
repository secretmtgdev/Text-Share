from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager
)

from utils.PostgresHelpers import (
    getFileFromDataStore,
    uploadToDataStore,
    insertFile,
    getAllFiles,
    deleteFromDataStore,
    addAccount,
    isValidLogin
)

from utils.Utils import userIsThrottled, incrementFailedAttempt, addUserLogin

app = Flask(__name__)
app.config["SECRET_KEY"] = "248e143a74cd4c27a8e4fc66abf13ac3"
CORS(app)
jwt = JWTManager(app)

@app.route('/file', methods=['GET', 'POST', 'DELETE'])
@jwt_required(optional=True)
def handleFile():
    current_identity = get_jwt_identity()
    print(f'Current identity of user {current_identity}')
    match request.method:
        case 'POST':
            if not current_identity:
                return jsonify({
                    'error_msg': 'current user does not have permission to upload files'
                }), 403
            file = request.files.get('file')
            return uploadFile(file)
        
        case 'GET':
            return getFileFromDataStore(request.args.get('fileName'));

        case 'DELETE':
            if not current_identity:
                return jsonify({
                    'error_msg': 'current user does not have permission to delete files'
                }), 403
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

@app.route('/signup', methods=['POST'])
async def signUp():    
    addedAccount = addAccount(request.form)
    if addedAccount:
        username = request.form.get('signup-username')
        await addUserLogin(username)
    return {}

@app.route('/signin', methods=['POST'])
async def signIn():
    username = request.form.get('signin-username')
    isThrottled = await userIsThrottled(username)
    if isThrottled:
        return jsonify({
            'error_msg': 'User is throttled, please wait 30 minutes'
        }), 429

    successfulLogin = isValidLogin(request.form)
    if successfulLogin:
        access_token = create_access_token(identity=request.form['signin-username'])
        return jsonify(access_token=access_token)
    else:
        await incrementFailedAttempt(username)
        return jsonify({
            'error_msg': 'Invalid username or password'
        }), 401

if __name__ == "__main__":
    app.run(debug=True)
