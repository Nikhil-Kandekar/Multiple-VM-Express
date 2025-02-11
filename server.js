const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to log API requests
app.use((req, res, next) => {
  const ip = req.ip; // Get the client's IP address
  const method = req.method; // HTTP method (GET, POST, PUT, DELETE)
  const url = req.originalUrl; // Request URL (endpoint)
  const body = req.body; // Request body (for POST, PUT)

  // Log the details to the console
  console.log(`[${new Date().toISOString()}] ${ip} ${method} ${url}`);
  if (Object.keys(body).length > 0) {
    console.log("Request Body:", JSON.stringify(body, null, 2));
  }

  // Call next middleware or route handler
  next();
});

// MongoDB connection with error handling
mongoose.connect("mongodb://nikhil:nikhil@192.168.56.103/?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Task Schema and Model
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }, // added completed field
});
const Task = mongoose.model("Task", TaskSchema);

// GET /api/tasks - Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});

// POST /api/tasks - Create a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({ title, completed }); // include completed in new task
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
});

// PUT /api/tasks/:id - Update a task by ID
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed }, // update the completed flag as well
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
});

// DELETE /api/tasks/:id - Delete a task by ID
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
});

// Server setup
app.listen(5000, () => console.log("Server is running on port 5000"));

