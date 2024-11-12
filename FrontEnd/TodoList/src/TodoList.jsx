import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = ({tasks,setTasks}) => {

  const [editingTask, setEditingTask] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDetails, setNewDetails] = useState("");


  const startEditing = (task) => {
    setEditingTask(task._id);
    setNewName(task.task);
    setNewDetails(task.details);
  };

  const handleTaskUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/tasks/${id}`, {
        task: newName,
        details: newDetails
      }); 
      console.log(response);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, task: response.data.task.task, details: response.data.task.details } : task
        )
      );
      setEditingTask(null);
      setNewName("");
      setNewDetails("");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleTaskCompleted = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/tasks/${id}`, { done: true });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, done: response.data.task.done } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
      alert("Failed to mark task as completed. Please try again.");
    }
  };

  return (
    <div>
      <div className="row border fw-bold">
        <div className="col">Task Name</div>
        <div className="col">Task Details</div>
        <div className="col">Status</div>
        <div className="col">Actions</div>
      </div>

      {tasks.map((t) => (
        <div className="row border my-2" key={t._id}>
          {editingTask === t._id ? (
            <>
              <div className="col">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New Task Name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="New Task Details"
                />
              </div>
              <div className="col">
                <button onClick={() => handleTaskUpdate(t._id)} className="btn btn-primary">Save</button>
                <button onClick={() => setEditingTask(null)} className="btn btn-secondary">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="col">{t.task}</div>
              <div className="col">{t.details}</div>
              <div className="col">{t.done ? 'Completed Yes' : 'Completed No'}</div>
              <div className="col">
                <button className="btn btn-info" onClick={() => startEditing(t)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteTask(t._id)}>Delete</button>
                {!t.done && (
                  <button className="btn btn-success" onClick={() => handleTaskCompleted(t._id)}>Mark as Completed</button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
