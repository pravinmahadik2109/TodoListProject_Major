const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080;

main().catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); // Ensure JSON parsing middleware is set up

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/MERN_PRJ').then(() => console.log('Connected Database!'));
}
app.listen(port, () => {
    console.log(`Server started at post ${port}`);
})

const TodoListSchema = new mongoose.Schema({
    task: String,
    details: String,
    done: Boolean
});

const TodoList = mongoose.model('TodoList', TodoListSchema);
app.post("/addTask", async (req, res) => {
    console.log('Post request received');

    const { name, details } = req.body; // Match these with your frontend keys

    console.log("Task name:", name);
    console.log("Details:", details);

    const newTask = new TodoList({
        task: name, // Storing 'name' as 'task' to match your schema
        details: details,
        done: false
    });

    try {
        // Save the new task to the database
        const savedTask = await newTask.save();
        console.log("New Task saved:", savedTask);

        // Send the saved task back in the response
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).json({ message: "Failed to save task" });
    }
});


app.get("/tasks", async (req, res) => {
    try {
        // Retrieve all tasks from the TodoList collection
        const tasks = await TodoList.find();
        console.log(tasks);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Failed to retrieve tasks" });
    }
});


app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`delete task with ${id}`);
    
    try {
        // Delete the task with the specified ID
        const deletedTask = await TodoList.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }
});


// Update task completion status by ID
app.patch("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    try {
        // Find the task by ID and update the done status
        const updatedTask = await TodoList.findByIdAndUpdate(
            id,
            { done: done },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task status updated", task: updatedTask });
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Failed to update task status" });
    }
});


// Update task details by ID
app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { task, details } = req.body;

    try {
        // Update the task fields
        const updatedTask = await TodoList.findByIdAndUpdate(
            id,
            { task, details },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
    }
});

