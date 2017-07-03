# UsersList

This is a test project that called "User List". Application allows users to perform CRUD operations with data. Users can:
- add, edit, delete users based on their "user_role". Every user can be registered as 'admin' or 'viewer'. Only 'admin' can perform 
  CRUD operations with data;
- browse users list and search users by firstname + lastname or firstname + email. It's server based search.
Also application provides pagination option, that's done on client side. User can choose amount of items per page. 
To run this app, please install node_modules folder into folder 'client' and then add required modules using npm.
Project includes JWT based authorization. When user signed in, application generates a token and then uses it
for different operations with database.
Node.js version - v.8.0.0, Angular version - 4.2.4.
To run application use following commands:
- 'nodemon' in root folder (if you have already intalled) for the back-end. Run it before starting front-end;
- 'npm start' in 'client' folder for front-end.
Also you need to create database that called 'userslist' in your MongoDB.
