# Task Management API

## Overview
This is a simple Task Management API built using Node.js, Express, and MongoDB. It allows users to create, read, update, and delete tasks.

## Features
- Log API requests with details
- Connect to MongoDB for persistent storage
- CRUD operations for task management
- JSON-based request and response handling
- Cross-Origin Resource Sharing (CORS) enabled

## Prerequisites
- Node.js installed
- MongoDB database instance

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
Modify the MongoDB connection string in `index.js`:
```js
mongoose.connect("mongodb://username:password@host/?authSource=admin")
```
Replace `username`, `password`, and `host` with your actual MongoDB credentials.

## Running the Application
Start the server with:
```sh
node index.js
```

## API Endpoints

### Get all tasks
```
GET /api/tasks
```
Response:
```json
[
  { "_id": "1", "title": "Task 1", "completed": false }
]
```

### Create a new task
```
POST /api/tasks
```
Request Body:
```json
{
  "title": "New Task",
  "completed": false
}
```
Response:
```json
{
  "_id": "2", "title": "New Task", "completed": false
}
```

### Update a task
```
PUT /api/tasks/:id
```
Request Body:
```json
{
  "title": "Updated Task",
  "completed": true
}
```

### Delete a task
```
DELETE /api/tasks/:id
```

## License
This project is licensed under the MIT License.

