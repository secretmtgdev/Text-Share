# Text Share
## Objective
This is a small project that leverages the RESTful architecture for uploading and reading files. The idea is to design a smooth system to handle fast and efficient data transer between the frontend and backend emulating that of Kindle. Feel free to read the [design doc](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/documents/DesignDoc.md)
![High level design](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/assets/design/design_1.jpeg)
![Current UI](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/assets/client_images/ui_6_18_2024.png)

## Tech stack
- Frontend
    - React
        - Like the flexibility of the library over a framework
        - Enjoy the rich features of the virtual DOM
    - Axios
        - Provides progress tracking that fetch doesn't
- Backend
    - Python
        - Easy language to pick up
        - Using psycog2 to connect to postgres
        - Using Flask for the main framework
        - Using FastAPI to connect to MongoDB
    - MongoDB
        - Great for unstructured data blobs
    - Postgres
        - Flexible data types

## How to run
- Client `npm start`
- Server
    - Flask: `flask --app PyAPI.py run -p 5000`
    - FastAPI: `uvicorn ApiGateway:app --reload --port 8000`

## Q & A
- **What can this project do?**
    - Read files from blob storage
    - Upload files to the database & blob storage
    - Sign up and sign in to upload and delete files
- **Will this project be expanded on?**
    - Most likely yes but it is more of a sandbox to try things out for a bigger project
- **What tables are there?**
    - accounts
    - files
    - file_datastore
    - shared_files

**_For more information, please refer to the [Database document](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/documents/DatabaseDoc.md)_**
- **What does the accounts table do?**
    - Stores information on the username, password, email, and associated text via a list of filenames
    - Passwords are to be encrypted with a gen_salt algorithm
    - Since usernames are unique, the username will be a primary key to pull up saved content
- **What does the files table do?**
    - Stores information about the filename, and upload date
- **What does the file_datastore table do?**
    - Acts as blob storage linking to the files table through the foreign key filename in files
- **What form of caching on the data tier is done?**
    - Sadly Redis isn't free so I'm leveraging MongoDB

 
## Special thanks to the following resource owners
- [How to build a simple real-time application using Flask, React and Socket.io](https://tinyurl.com/329ysur4) by Adrian Huber
- [System Design V1](https://bytebytego.com/) by Alex Xu
- [Postgres docs](https://www.postgresql.org/docs/current)
- [Kafka quickstart](https://kafka.apache.org/quickstart)