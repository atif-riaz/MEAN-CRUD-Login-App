# MEAN CRUD Login App

This project is a registration/login web app built around the MEAN stack.

## Build

Run `npm install` to install all the dependencies.

Run `mongod` in a separate command window to host the MongoDB process in the background. The process runs on port `27017` by default. If you change the port, navigate to the `server.js` file in the source directory and update the port.

Run `npm start` to build the app and navigate to `http://localhost:3000/`.

## Features

The app is pretty straightforward with the following features:

* Create new users
* Login for existing users
* Delete existing users
* Update details of an existing user 
* Validation on unique Email for new and existing users

## Further help

Navigate to `http://localhost:3000/users` for the complete user list and an admin panel for testing purposes.
