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
    INSERT INTO files (file_name)
    VALUES (%s);
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

class TopicType(IntEnum):
    SMS = 0
    EMAIL = 1