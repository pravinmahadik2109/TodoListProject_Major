import React, { useEffect, useState } from 'react'

export const TaskDetails = ({ tasks, taskDetails, taskDetailsId }) => {
    let [task, setTask] = useState({});
    useEffect(() => {
        const fetchTask = () => {
            const t = tasks.find((t) => t.id == taskDetailsId);
            setTask(t);
        }
        fetchTask();
    }, []);
    return (
        <div>

            <h1 className="text-danger">Welcome to DIEMS TodoList App</h1>
            <div className="row border fw-bold">
                <div className="col">Task Name</div>
                <div className="col">Task Details</div>
                <div className="col">Status</div>
                <div className="col">Actions</div>
            </div>
            <div className="row border fw-bold text-primary" >
                <div className="col">{task.name}</div>
                <div className="col">{task.details}</div>
                <div className="col">{task.done ? 'Completed Yes' : 'Completed No'}</div>
                
            </div>
            <div className="my-5 text-start">
                <button className="btn-secondary btn" onClick={()=>{taskDetails(false)}}>Back</button>
            </div>
        </div>

    )
}
