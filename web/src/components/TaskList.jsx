import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ todos, markCompleted, deleteToDo }) => {
    return todos.map(todo => (
        <TaskItem
            key={todo._id}
            todo={todo}
            markCompleted={markCompleted}
            deleteToDo={deleteToDo}
        />
    ));
};

export default TaskList;
