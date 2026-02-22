# To-Do Application

This is a small to-do application built with Node.js, Express.js, and MongoDB for practising database connection and CRUD application

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: HTML, CSS, JavaScript (I'll be honest, frontend is vibe coded 😂)
- **Package Manager**: npm

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation & Setup

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory**
   ```
   PORT=3000
   DATABASE_CONNECTION_URL=mongodb://localhost:27017/todo-app
   ```
   Replace `mongodb://localhost:27017/todo-app` with your MongoDB connection string.

4. **Start the server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to access the application.

## 📡 API Endpoints

### Create Task
- **POST** `/api/create`
- **Request Body**:
  ```json
  {
    "task": "Buy groceries"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Created",
    "data": {
      "_id": "...",
      "task": "Buy groceries",
      "status": "Pending"
    }
  }
  ```

### Get All Tasks
- **GET** `/api/display-tasks`
- **Response**:
  ```json
  {
    "message": "OK",
    "data": [
      {
        "id": "...",
        "task": "Buy groceries",
        "status": "Pending"
      }
    ]
  }
  ```

### Update Task Status
- **PATCH** `/api/update-task/:id`
- **Response**: Returns the updated task with toggled status (Pending ↔ Completed)

### Delete Task
- **DELETE** `/api/delete-task/:id`
- **Response**:
  ```json
  {
    "message": "Deleted",
    "data": {}
  }
  ```

## Project Structure

```
To-Do/
├── server.js                 # Express server setup and configuration
├── package.json              # Project dependencies
├── .env                       # Environment variables (create this)
│
├── model/
│   └── TaskModel.js          # MongoDB Task schema and model
│
├── routes/
│   └── taskRoutes.js         # API route handlers for CRUD operations
│
└── public/
    └── index.html            # Frontend UI
```

## Error Handling

The API returns appropriate HTTP status codes:
- `201` - Created (successful POST/PATCH)
- `200` - OK (successful GET)
- `400` - Bad Request (missing parameters)
- `404` - Not Found (task doesn't exist)
- `500` - Internal Server Error

## License

Use freely as you wish 😝

---

**Thank You!!!** 