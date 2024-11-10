import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TaskDetails } from './TaskDetails';
import {EditTask}  from './EditTask';  // Make sure this is correctly imported
import { CreateTask } from './CreateTask ';

export const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Eat', details: 'Eat Less', done: false },
    { id: 2, name: 'Read', details: 'Read More', done: false },
    { id: 3, name: 'Sleep', details: 'Sleep Adequate', done: false }
  ]);
  const [taskDetails, setTaskDetails] = useState(false);
  const [taskDetailsId, setTaskDetailsId] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(0);  // Store the task ID being edited

  // Find the task based on the ID to pass it to the EditTask component
  const taskToEdit = tasks.find(task => task.id === editingTaskId);

  return (
    <div className="container text-center my-3">
       <h1 className="text-danger">Welcome to DIEMS TodoList App</h1>
      < CreateTask setTasks={setTasks} />
      {/* Render EditTask if a task is being edited */}

      {editingTaskId !== 0 && (
        <EditTask tasks={tasks} task={taskToEdit} setTasks={setTasks} setEditingTaskId={setEditingTaskId} />
      )}
      
      {/* Conditionally render TaskDetails or TodoList */}
      {taskDetails ? (
        <TaskDetails tasks={tasks} taskDetails={setTaskDetails} taskDetailsId={taskDetailsId} />
      ) : (
        <TodoList
          tasks={tasks}
          taskDetails={setTaskDetails}
          setTaskDetailsId={setTaskDetailsId}
          setTasks={setTasks}
          setEditingTaskId={setEditingTaskId}  // Pass down setEditingTaskId to TodoList
        />
      )}
      
    </div>
  );
};
