# Drive share
## Understanding the problem
Drive share is a file storage service to store text documents. You can access text files locally and share them with anyone from around the world!
![Directory sharing](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/assets/design/basic_ui.jpeg)

- **What are the most important features?**
    - Upload & download files
    - File sync
    - Notification system for edit, delete, and share
- **What file formats are allowed?**
    - Text only
- **Do the files need to be encrypted?**
    - Yes
- **Is there a file size limit?**
    - Yes, 10GB

### Requirements
#### Functional
- Users can upload files
- Users can download files
- Users can share files
- File changes are reflected
- Users receive various notifications
#### Non-functional
- Reliability as data loss shouldn't be a thing
- Swift sync of data
    - Avoid loss of interest in product
- Minimal bandwitdth usage
- High availability

#### Estimations
- Assume we get 2 users with an average of 1 DAU (me!)
- Users get up to 10GB of data free!
- Assume an average of 2 uploads per day with file sizes of 500KB
- Read & Writes are even (1:1)
- Total space: 2 users * 10GB = 20 GB
- QPS for upload API: 1 user * 2 uploads / 24 hours / 3600 seconds = 0.00002314814s
    - Tells us that scalability is a non issue here
- Peak QPS = QPS * 2 = 0.00004629629s
    - Really not going to overload the system, one server is fine

## High level design
At the very top level there should be a directory for the drive. Users should then be able to upload their own files which will in turn be placed in their drive.
![Directory sharing](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/assets/design/directory_share.jpeg)
