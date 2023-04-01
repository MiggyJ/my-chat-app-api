# Express JS API for Chatting Application
This is a RESTful API built with Express JS for a Chatting Application. It provides endpoints for users to authenticate, create conversations, and send messages.

## Prerequisites
- Node.js v14 or higher
- npm or yarn package manager

## Installation
To get started, clone the repository and run the following commands in the project directory:

```npm install```

Or if you prefer using yarn:

```yarn install```

## Configuration
Before starting the server, make sure to configure the following environment variables in a .env file:



```PORT=3000```

```JWT_SECRET=your_jwt_secret```

```COOKIE_SECRET=your_cookie_secret```

It is recommended for secrets to be a random string of characters.

The PORT variable is the port number on which the server will listen, and JWT_SECRET is the secret key used to sign JSON Web Tokens for authentication.

## Database Configuration
The application uses a SQLite database to store conversations and messages. The database is managed using Sequelize ORM. To configure the database, update the config/config.json file with your database credentials.

## Running the Server
To start the server, run the following command:

```npm run start```

Or if you prefer using nodemon for development:

```npm run dev```

## Database Migrations
The application uses Sequelize migrations to create and modify database tables. To migrate the database, run the following command:

```npm run migrate:redo```

This will reset the database by deleting all entries and running all migration files.

## Endpoints
| Method  | Route             | Details        |
| --------| ------------------| ---------------|
POST      | /api/auth/login   | Login a user and return a JSON Web Token for authentication.
POST      | /api/auth/register| Register a new user.
POST      | /api/auth/logout  | Register a new user.
GET       | /api/auth/user    | Get the authenticated user.
GET       | /api/connection/search| Get a list of connection for the authenticated user.
GET       | /api/connection/requestList| Get a list of received connection requests.
POST      | /api/connection/request| Request for a connection to start a conversation.
PUT       | /api/connection/:id/:action| Accept or Reject a connection request.
GET       | /api/inbox/list  | Get a list of all your contacts.
GET       | /api/chat/:inbox/view | Get a list of chat messages in an inbox.
POST      | /api/chat/:inbox/send  | Send a message in a conversation.

## Technologies Used
- Express JS: Web framework for building RESTful APIs.
- JSON Web Token (JWT): For authentication and authorization.
- Sequelize: ORM for managing SQLite database.
- SQLite: Database for storing conversations and messages.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).