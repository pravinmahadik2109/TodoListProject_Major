import React, { useState } from 'react';

export const CreateTask = ({ setTasks }) => {
  // Local state for the new task
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');

  // Handle input changes for the task form
  const handleNameChange = (e) => setName(e.target.value);
  const handleDetailsChange = (e) => setDetails(e.target.value);

  // Handle the task submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!name || !details) {
      alert('Please enter both a task name and details!');
      return;
    }

    // Create a new task object
    const newTask = {
      id: Date.now(), // Use current timestamp as unique ID
      name,
      details,
      done: false, // New tasks are not completed by default
    };

    // Update the tasks state in the parent component
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Reset the form
    setName('');
    setDetails('');
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
        <button type="submit" className="btn btn-success my-2">Add Task</button>
      </form>
    </div>
  );
};
