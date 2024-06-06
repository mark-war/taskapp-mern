import React, { useState, useContext } from 'react';

const AddTask = ({ addToDo, currentUser }) => {
    const [desc, setTitle] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!desc || !currentUser) return; // Ensure description and user are available
        addToDo(desc, currentUser._id);
        setTitle('');
    }

    const onChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex', marginTop: '80px', marginBottom: '50px' }}>
            <input
                type='text'
                name='desc'
                style={{ flex: '10', padding: '5px' }}
                placeholder='Add Task...'
                value={desc}
                onChange={onChange}
            />
            <input
                type='submit'
                value='Add Task'
                className='btn'
            />
        </form>
    );
};

export default AddTask;
