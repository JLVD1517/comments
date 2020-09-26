# comments

A Node js application for commenting system

## Features
- A new comment can be posted by a user
- A user can reply to any comment
- Any comment can be modified by the owner of the comment

## Requirements

-   Mysql  **9+**
-   Node   **12+**

### Setting up environments (development or production)

1.  In the root/src/configs of this repository you will find a file named `config.json`
2.  Edit the neccessary configs


## How to run

### Database creation and seeding samples 
1. Create a database with any name example: comments
2. Run the script to load the data using following command

```bash
mysql -u username -p [database_name] < comments.sql
```

### How to run and use the app
1. Navigate inside root/src folder and execute 
```bash
node comments.js
```
2. You will see the server running at port 5005.

### Running tests
There are 3 apis available for use and the link for the postman collection is provided below
1. API to create a new comment
2. API to reply to a comment
3. Update the added comment

[Postman collectin](https://www.getpostman.com/collections/dcab41ab92a979f6f39e)
