
# The Database
## Replication tactics
Currently there are not tactics behind this because the scope of users is small. If there is to be an expansion in user activity or DAU then it would be best to replicate this data following a leader-follower pattern as to have one source of truth.

## ACID
### Atomicity
Ensure that if a file is uploaded, the tables (files, accounts, and file_datastore) are updated to reflect this. If an error occurs in upload the corresponding tables should not have information on the updated file.

The same paradigm is true for the delete functionality. We can ensure this at each step of our SQL queries. If there's an issue detected with on of the tables, roll back the CRUD operation and reflect this on the users end.

### Consistency
Uploaded file data should remain the same. The file_datastore keeps the appropriate format of the table as binary content and the decoder on the frontend decodes the contents leveraging the same encryption/decryption algorithm.

### Isolation
File uploads and deletions are independent of one another. Deleting a file does not impact uploading a file.

### Durability
Information is written on the disk. Despite the disk read being slow, this ensures that we can avoid a total loss of data in the event of a Database failure.

## Tables
### Files
```
{
	file_id: SERIALIZE INTEGER PRIMARY KEY NOT NULL,
	file_name: VARCHAR(255) NOT NULL,
	upload_date: DATE,
	file_content: OID, -- points to file datastore
	owner: VARCHAR(255) -- corresponds to username which is unique
}
```

### File_datastore
```
{
	file_name: VARCHAR(255) PRIMARY KEY NOT NULL,
	blob: BYTEA,
	file_size: BIGINT
}
```

### Accounts
```
{
	account_id: SERIALIZE INTEGER PRIMARY KEY NOT NULL,
	username: VARCHAR(255) NOT NULL, --indexed for uniqueness
	password: VARCHAR(255) NOT NULL,
	email: VARCHAR(255) NOT NULL, --indexed for uniqueness
	owned_files: TEXT[],
	shared_files: TEXT[],
	country_code: INTEGER,
	phone_number: INTEGER,
	created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
}
```

### Shared_files

```
{
	file_name: VARCHAR(255) PRIMARY KEY NOT NULL,
	shared_with: TEXT[]
}
```
