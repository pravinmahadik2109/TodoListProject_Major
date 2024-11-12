import React, { useState } from 'react';
import axios from 'axios';

export const CreateTask = ({setTasks}) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDetailsChange = (e) => setDetails(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HandleSubmit Called");

    if (!name || !details) {
      alert('Please enter both a task name and details!');
      return;
    }

    const newTask = { name, details, done: false };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/addTask", newTask);

      // Update the task list in the parent if the request is successful
      setTasks((prevTasks) => [...prevTasks, response.data]);
      
      // Clear the form fields
      setName('');
      setDetails('');
    } catch (error) {
      console.error("There was an error creating the task:", error);
      alert("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-form">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="form-control"
            placeholder="Enter task name"
          />
        </div>
        <div className="form-group">
          <label>Task Details</label>
          <input
            type="text"
            value={details}
            onChange={handleDetailsChange}
            className="form-control"
            placeholder="Enter task details"
          />
        </div>
        <button type="submit" className="btn btn-success my-2" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};
