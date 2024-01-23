import { useState } from 'react';
import { postTasks } from '../../tasklistApi/tasklist.api';

function AddTaskForm(props) {
    const [userValue, setUserValue] = useState('');
    const [taskValue, setTaskValue] = useState('');
    // const [completedValue, setCompletedValue] = useState('');

    const handleChangeTask = (event) => {
        setTaskValue(event.target.value);
    };


const handleSubmitTask = (event) => {
    event.preventDefault();
    console.log('SUBMIT', {
        User: userValue,
        Task: taskValue,
        // Completed: completedValue,
    });

    postTasks({
        User: userValue,
        Task: taskValue,
        // Completed: completedValue,
    })
    .then((response) => {
        props.taskRefreshCallback();
        setUserValue('');
        setTaskValue(''); 
        // setCompletedValue(''); 
    })
    .catch((err) => {
        console.log('ERROR', err);
    });
};

return (
    <form onSubmit={handleSubmitTask} className="App-header">
        <label>
            <span>User:</span>
            <input 
                id="User"
                onChange={(event) => setUserValue(event.target.value)}
                value={userValue}
                />
        </label>
        <lable>
            <span>Task:</span>
            <input
                id="Task"
                onChange={handleChangeTask}
                value={taskValue}
                />
        </lable>
        <button type="submit">Submit</button>
    </form>
)
};

export default AddTaskForm;