import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [newName, setNewName] = useState("");
  const [newDetails, setNewDetails] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Function to set a task in edit mode
  const startEditing = (task) => {
    setEditingTask(task._id);
    setNewName(task.name);
    setNewDetails(task.details);
  };

  // Function to handle task update
  const handleTaskUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/tasks/${id}`, {
        name: newName,
        details: newDetails
      });
      
      // Update tasks state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, name: response.data.task.name, details: response.data.task.details } : task
        )
      );

      // Clear edit mode
      setEditingTask(null);
      setNewName("");
      setNewDetails("");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask === task._id ? (
              <div>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New Task Name"
                />
                <input
                  type="text"
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="New Task Details"
                />
                <button onClick={() => handleTaskUpdate(task._id)} className="btn btn-primary">Save</button>
                <button onClick={() => setEditingTask(null)} className="btn btn-secondary">Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{task.name}</h3>
                <p>{task.details}</p>
                <button onClick={() => startEditing(task)} className="btn btn-warning">Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
