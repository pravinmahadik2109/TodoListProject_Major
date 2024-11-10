import React, { useState, useEffect } from 'react';

export const EditTask = ({ tasks,task, setTasks, setEditingTaskId }) => {
  // Local state for editing task name and details
  const [name, setName] = useState(task.name);
  const [details, setDetails] = useState(task.details);

  // Update local state with task data when the component mounts
  useEffect(() => {
    setName(task.name);
    setDetails(task.details);
  }, [task]); // Run when task changes

  // Handle saving the edited task
  const handleSave = () => {
    // Update the tasks list with the new task details
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, name, details } : t
    );
    setTasks(updatedTasks); // Update the tasks in the state
    setEditingTaskId(0); // Close the edit view by resetting editingTaskId
  };

  // Handle canceling the edit (no changes will be saved)
  const handleCancel = () => {
    setEditingTaskId(0); // Close the edit view
  };

  return (
    <div className="edit-task-form">
      <h2>Edit Task</h2>
      <div className="form-group">
        <label>Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Task Details</label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-primary my-2" onClick={handleSave}>
          Save Changes
        </button>
        <button className="btn btn-secondary my-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
