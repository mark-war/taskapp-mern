import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css'; // Import the CSS file

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAssignTask = (userId) => {
        navigate(`/manage-task/${userId}`);
    };

    return (
        <div className="users-container">
            <ul className="users-list">
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} ({user.email})
                        <button className="assign-task-button" onClick={() => handleAssignTask(user._id)}>Assign Task</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
