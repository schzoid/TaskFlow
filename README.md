
# TaskFlow - Task Management REST API

## Project Description

TaskFlow is a REST API developed using Node.js and Express.js. It allows users to create, view, update, and delete tasks.

The project demonstrates REST API development, CRUD operations, routing, JSON data handling, and middleware implementation.

## Technologies

- Node.js
- Express.js
- JavaScript
- Postman

## Installation

1. Clone the repository:
   git clone REPOSITORY_URL

2. Navigate to the project directory.

3. Install dependencies:
   npm install

4. Start the server:
   node index.js

The API runs at:
http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /tasks | Create a task |
| GET | /tasks | List all tasks |
| GET | /tasks/:id | Get a task by ID |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Task Data Structure

Example JSON request:

{
  "title": "Backend API Development",
  "description": "Complete CRUD operations",
  "status": "pending",
  "priority": "high",
  "assignee": "Efe"
}

## Middleware

The application includes a logger middleware that records incoming HTTP requests, including the request method, endpoint, and timestamp.

## API Testing

All five CRUD operations are tested using Postman.

Screenshots of the tests are available in the `screenshots` directory.