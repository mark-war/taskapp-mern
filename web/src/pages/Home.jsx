import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

const Home = () => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [todos, setTodos] = useState([]);
    const filteredTodos = showCompleted ? todos.filter(todo => todo.completed) : todos;

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/tasks');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addToDo = async (desc) => {
        if (!desc) return;
        const newTask = {
            desc
        };

        try {
            const response = await fetch('http://localhost:5001/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
            const data = await response.json();
            setTodos(prevTodos => [...prevTodos, data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const markCompleted = async (id) => {
        const updatedTodo = todos.find((todo) => todo._id === id);
        updatedTodo.completed = !updatedTodo.completed;

        try {
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });
            const data = await response.json();
            setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
            if (updatedTodo.completed) toast.success('Task marked as completed successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteToDo = async (id) => {
        try {
            await fetch(`http://localhost:5001/api/tasks/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter((todo) => todo._id !== id));
            toast.success('Task deleted successfully from the list!')
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <AddTask addToDo={addToDo} />
                <div className="task-list-container">
                    <TaskList
                        todos={filteredTodos}
                        markCompleted={markCompleted}
                        deleteToDo={deleteToDo}
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
