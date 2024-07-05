from enum import IntEnum

GET_FILE_BY_NAME = """
    SELECT 1 FROM files
    WHERE file_name = (%s);
"""

DELETE_FILE_BY_NAME = """
    DELETE FROM files
    WHERE file_name = (%s);
"""

ADD_FILE = """
    INSERT INTO files (file_name, uuid)
    VALUES (%s, gen_random_uuid());
"""

GET_BLOB_BY_FILE_NAME = """
    SELECT blob
    FROM file_datastore
    WHERE file_name = %s;
"""

DELETE_BLOB_BY_FILE_NAME = """
    DELETE FROM file_datastore
    WHERE file_name = %s;
"""

GET_ACCOUNT_BY_EMAIL = """
    SELECT 1 FROM accounts
    WHERE email = (%s);
"""

ADD_NEW_ACCOUNT = """
    INSERT INTO accounts (username, password, email)
    VALUES (%s, %s, %s);
"""

DELETE_ACCOUNT_BY_EMAIL = """
    DELETE FROM accounts
    WHERE email = (%s);
"""

GET_ACCOUNT_PASSWORD_BY_USERNAME = """
    SELECT password FROM accounts
    WHERE username = %s;
"""

class TopicType(IntEnum):
    SMS = 0
    EMAIL = 1