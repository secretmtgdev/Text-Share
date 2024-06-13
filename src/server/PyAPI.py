from flask import Flask, request
from flask_cors import CORS
import psycopg2

connection = psycopg2.connect(database='WordScanning', host='localhost', port='5432')

app = Flask(__name__)
CORS(app)

def dbContainsFile(fileName):
    sql = """
        SELECT 1 FROM files
        WHERE file_name = (%s)
    """
    try:
        with connection.cursor() as cur:
            cur.execute(sql, (fileName,))
            if cur.fetchone():
                return True
            else:
                return False
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        # there was an issue here, assume there is an entry
        return True

def insertFile(fileName):
    sql = """
        INSERT INTO files (file_name)
        VALUES (%s);
    """
    file_id = None

    try:
        with connection.cursor() as cur:
            if not dbContainsFile(fileName=fileName):
                cur.execute(sql, (fileName,))
                connection.commit()
            else:
                print('FILE ALREADY IN DB')
                return None

    except (Exception, psycopg2.DatabaseError) as error:
        print('ERROR WHEN CONNECTING WITH DB')
        print(error)
    finally:
        return file_id

@app.route('/files', methods=['GET', 'POST'])
def uploadFile():
    file_to_upload = request.files.get('file')
    file_id = insertFile(fileName=file_to_upload.filename)
    return f"<h1>{file_id}</h1>"

