import React, { useState } from 'react';

const AddTask = ({ addToDo }) => {
    const [desc, setTitle] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        addToDo(desc);
        setTitle('');
    }

    const onChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
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
