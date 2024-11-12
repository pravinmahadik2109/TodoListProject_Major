import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import { TaskDetails } from './TaskDetails';
import { CreateTask } from './CreateTask ';
import axios from 'axios';

export const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tasks");
        setTasks(response.data); // Set tasks with the data from backend
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Invoke the function to fetch tasks
  }, []);
  


  return (
    <div className="container text-center my-3">
      <h1 className="text-danger">Welcome to DIEMS TodoList App</h1>
      < CreateTask setTasks={setTasks} />
      {/* Render EditTask if a task is being edited */}
      <TodoList  tasks ={tasks} setTasks={setTasks} />
    </div>
  );
};
