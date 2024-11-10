import React, { useState } from 'react';

export const TodoList = ({tasks,taskDetails,setTaskDetailsId,setTasks,setEditingTaskId}) => {
  

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    console.log('delete id', id);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  // Handle marking a task as completed
  const handleTaskCompleted = (id) => {
    console.log('Completed id', id);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: true } : task
    );
    setTasks(updatedTasks);
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
        <div className="row border my-2" key={t.id}>
          <div className="col">{t.name}</div>
          <div className="col">{t.details}</div>
          <div className="col">{t.done ? 'Completed Yes' : 'Completed No'}</div>
          <div className="col">
            <button href="#" className="btn btn-info" onClick={()=>{
                setTaskDetailsId(t.id);
                taskDetails(true);
                

            }}>
              Select More
            </button>
          </div>

          <div className="col">
            <button className="btn btn-primary" onClick={() => 
                setEditingTaskId(t.id)}>Edit</button>
          </div>
          <div className="col">
            <button
              className="btn-danger btn"
              onClick={() => handleDeleteTask(t.id)}
            >
              Delete
            </button>
          </div>
          <div className="col">
            <button
              className="btn-success btn"
              onClick={() => handleTaskCompleted(t.id)}
            >
              Mark as Completed
            </button>
          </div>
        </div>
      ))}

      <div className="my-5 text-start">
        <button className="btn-secondary btn">Create New Task</button>
      </div>
    </div>
  );
};
