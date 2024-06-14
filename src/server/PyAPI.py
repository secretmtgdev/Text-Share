from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

connection = psycopg2.connect(database='WordScanning', host='localhost', port='5432')

app = Flask(__name__)
CORS(app)

GET_FILE_BY_NAME = """
    SELECT 1 FROM files
    WHERE file_name = (%s);
"""

ADD_FILE = """
    INSERT INTO files (file_name)
    VALUES (%s);
"""

GET_BLOB_BY_FILE_NAME = """
    SELECT blob
    FROM file_datastore
    WHERE file_name = %s;
"""

######################
## POSTGRES helpers ##
######################
def dbContainsFile(fileName):
    db_contains_file = False
    try:
        with connection.cursor() as cur:
            print(f'CHECKING IF {fileName} EXISTS IN DB')
            cur.execute(GET_FILE_BY_NAME, (fileName,))
            file_exists = cur.fetchone()
            print(f'RECORD RETURNED {file_exists}')
            if file_exists is not None:
                db_contains_file = True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        # there was an issue here, assume there is an entry
        return db_contains_file

def insertFile(fileName):
    file_id = None

    try:
        with connection.cursor() as cur:            
            if not dbContainsFile(fileName=fileName):
                cur.execute(ADD_FILE, (fileName,))
                connection.commit()
            else:
                print('FILE ALREADY IN DB')
                return None

    except (Exception, psycopg2.DatabaseError) as error:
        print('ERROR WHEN CONNECTING WITH DB')
        print(error)
    finally:
        return file_id

def getAllFiles():
    try:
        with connection.cursor() as cur:
            cur.execute("SELECT file_name FROM files;")
            records = cur.fetchall()
            return [fileName[0] for fileName in records]
    except (Exception, psycopg2.DatabaseError) as error:
        print('ERROR WHEN CONNECTING WITH DB')
        print(error)

def uploadToDataStore(file_to_upload):
    BLOB = psycopg2.Binary(file_to_upload.read())
    try:
        with connection.cursor() as cur:
            cur.execute("INSERT INTO file_datastore(file_name, blob, file_size) VALUES(%s, %s, %s)", (file_to_upload.filename, BLOB, file_to_upload.__sizeof__()))       
            cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print('ERROR WHEN UPLOADING BLOB')
        print(error)
    finally:
        if connection is not None:
            connection.commit()
    
def getFileFromDataStore(fileName):
    print('GETTING FILE FROM BLOB STOAGE')
    try:
        with connection.cursor() as cur:
            cur.execute(GET_BLOB_BY_FILE_NAME, (fileName,))
            record = cur.fetchone()
            return {
                'blobData': bytes(record[0]).decode()
            }
        
    except(Exception, psycopg2.DatabaseError) as error:
        print(f'ERROR WHEN FETCHING {fileName} FROM BLOB STORAGE')
        print(error)
    finally:
        if connection is not None:
            connection.commit()

#################
## FILES ROUTE ##
#################
@app.route('/file', methods=['GET', 'POST'])
def handleFile():
    if request.method == 'POST':
        file = request.files.get('file')
        return uploadFile(file)
    
    if request.method == 'GET':
        return getFileFromDataStore(request.args.get('fileName'));

@app.route('/files', methods=['GET', 'POST'])
def handleFiles():
    if request.method == 'GET':
        return getFiles()    

def uploadFile(file_to_upload):
    uploadToDataStore(file_to_upload)
    file_id = insertFile(fileName=file_to_upload.filename)
    return f"<h1>{file_id}</h1>"

def getFiles():
    fileNames = getAllFiles()
    print(f'FILES TO RETURN: {fileNames}')
    return {
        'fileNames': fileNames
    }
