import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Import the configured axios instance

const AssignTask = () => {
    const { userId } = useParams();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/users/manage-task/${userId}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleAssign = async (taskId) => {
        try {
            console.log('Assigning Task:', taskId, 'to User:', userId); // Log to verify taskId and userId
            await api.post(`/users/manage-task/${userId}/assign`, { userId, taskId });
            console.log('task assigned!');
            alert('Task assigned successfully');
            navigate(`/manage-task/${userId}`);
        } catch (error) {
            console.error('Error assigning task:', error);
            alert('Error assigning task');
        }
    };

    return (
        <div className="task-container">
            <h2>Assign Task</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.desc}</td>
                            <td>
                                <button onClick={() => handleAssign(task._id)}>Assign</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignTask;
