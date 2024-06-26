﻿# taskapp-mern
TaskApp MERN
About
TaskApp is a task management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, read, update, and delete tasks.

Features
User authentication and authorization
Create, update, delete tasks
Task categorization
Responsive design

Installation
Clone the repository:

  git clone https://github.com/mark-war/taskapp-mern.git
  cd taskapp-mern

Install dependencies for both api and web:

  cd api
  npm install
  cd ../web
  npm install

Set up environment variables:

Create a .env file in the api directory with the following variables:

  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secr

Start the development servers:

  cd api
  npm start
  cd ../web
  npm start

Usage
Visit http://localhost:3000 to view the application.
Sign up or log in to manage tasks.
Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss any changes.

License
This project is licensed under the MIT License.
