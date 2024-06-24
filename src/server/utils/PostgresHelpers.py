import psycopg2

import utils.Constants as Constants

connection = psycopg2.connect(database='ShareDrive', host='localhost', port='5432')
def dbContainsFile(fileName):
    db_contains_file = False
    try:
        with connection.cursor() as cur:
            print(f'CHECKING IF {fileName} EXISTS IN DB')
            cur.execute(Constants.GET_FILE_BY_NAME, (fileName,))
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
                cur.execute(Constants.ADD_FILE, (fileName,))
                connection.commit()
            else:
                print('FILE ALREADY IN DB')
                return None

    except (Exception, psycopg2.DatabaseError) as error:
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
            cur.execute(Constants.GET_BLOB_BY_FILE_NAME, (fileName,))
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

def deleteFromDataStore(fileName):
    print('DELETING FROM BLOB STORAGE')
    try:
        with connection.cursor() as cur:
            cur.execute(Constants.DELETE_FILE_BY_NAME, (fileName, ))
            cur.execute(Constants.DELETE_BLOB_BY_FILE_NAME, (fileName, ))
            cur.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print('ERROR WHEN DELETING {fileName} FROM TABLES')
        print(error)
    finally:
        if connection is not None:
            connection.commit()
    

##############
## ACCOUNTS ##
##############
def accountExists(email):
    account_exists = False
    try:
        with connection.cursor() as cur:
            print(f'CHECKING IF {email} EXISTS IN DB')
            cur.execute(Constants.GET_ACCOUNT_BY_EMAIL, (email,))
            account_exists = cur.fetchone()
            print(f'RECORD RETURNED {account_exists}')
            if account_exists is not None:
                account_exists = True
            return account_exists
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        return account_exists
    
"""
    Returns true if a new account was created.

    @params accountDetails - Form data passed from the client.
"""
def addAccount(accountDetails):
    username = accountDetails.get('signup-username')
    password = accountDetails.get('signup-password')
    email = accountDetails.get('signup-email')
    # phone = accountDetails.get('signup-phone-number')

    try:
        with connection.cursor() as cur:            
            if not accountExists(email):
                cur.execute(Constants.ADD_NEW_ACCOUNT, (username, password, email,))
                connection.commit()
                print('CREATED ACCOUNT')
                return True
            else:
                print('ACCOUNT ALREADY IN DB')
                return False

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
def isValidLogin(loginDetails):
    username = loginDetails.get('signin-username')
    password = loginDetails.get('signin-password')
    successful_login = False
    try:
        with connection.cursor() as cur:
            cur.execute(Constants.GET_ACCOUNT_PASSWORD_BY_USERNAME, (username,))
            query_result = cur.fetchone()
            if not query_result:
                raise Exception('NO USER FOUND')

            stored_password = query_result[0]
            print(f'COMPARING {stored_password} and {password}')
            if stored_password != password:
                raise Exception('PASSWORD IS INCORRECT')
            
            successful_login = True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        return successful_login