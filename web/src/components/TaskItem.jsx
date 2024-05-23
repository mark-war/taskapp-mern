import React from 'react';

const TaskItem = ({ todo, markCompleted, deleteToDo }) => {
    const getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            color: 'black',
            borderBottom: '2px #ccc dotted',
            textDecoration: todo.completed ? 'line-through' : 'none'
        };
    };

    return (
        <div style={getStyle()}>
            <p>
                <input
                    name='isCompleted'
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => markCompleted(todo._id)}
                />
                {'\t'}
                {todo.desc}
                <button
                    style={btnStyle}
                    onClick={() => deleteToDo(todo._id)}
                >
                    X
                </button>
            </p>
        </div>
    );
};

const btnStyle = {
    background: 'crimson',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
};

export default TaskItem;
