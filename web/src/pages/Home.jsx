import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import api from '../utils/api'; // Import the configured axios instance
import AuthContext from '../components/AuthContext'; // Import the AuthContext

const Home = () => {
    const { isAuthenticated, currentUser, loading } = useContext(AuthContext); // Access the user from the AuthContext
    const [showCompleted, setShowCompleted] = useState(false);
    const [todos, setTodos] = useState([]);
    const filteredTodos = showCompleted ? todos.filter(todo => todo.completed) : todos;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks')
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        if (isAuthenticated && currentUser && !loading) {
            fetchTasks();
        }
    }, [isAuthenticated, currentUser, loading]);

    const addToDo = async (desc) => {
        if (!desc || !currentUser) return;
        const newTask = {
            desc,
            user: currentUser
        };

        try {
            const response = await api.post('/tasks', newTask);
            setTodos(prevTodos => [...prevTodos, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const markCompleted = async (id) => {
        const updatedTodo = todos.find((todo) => todo._id === id);
        updatedTodo.completed = !updatedTodo.completed;

        try {
            const response = await api.put(`/tasks/${id}`, updatedTodo);
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
            if (updatedTodo.completed) toast.success('Task marked as completed successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteToDo = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
            toast.success('Task deleted successfully from the list!');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const assignTaskToMe = async (id) => {
        try {
            const response = await api.put(`/tasks/${id}`, { userId: user._id });
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
            toast.success('Task assigned to you successfully!');
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <AddTask addToDo={addToDo} currentUser={currentUser} />
                <div className="task-list-container">
                    <TaskList
                        todos={filteredTodos}
                        markCompleted={markCompleted}
                        deleteToDo={deleteToDo}
                        assignTaskToMe={assignTaskToMe} // Pass the assignTaskToMe function to TaskList component
                    />
                </div>
            </div>
            <footer className="footer">
                <div className="filter-options">
                    <label>
                        <input
                            type="checkbox"
                            checked={showCompleted}
                            onChange={() => setShowCompleted(!showCompleted)}
                        />{'\t'}Show Completed Only
                    </label>
                </div>
            </footer>
            <ToastContainer />
        </>
    )
}

export default Home
