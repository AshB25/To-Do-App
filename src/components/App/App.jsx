import { useState, useEffect } from 'react';
import Header from '../App/Header/Header'
import { fetchTasks, deleteTasks, updateTaskComplete } from '../../tasklistApi/tasklist.api';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import './App.css';

function App () {
  const [taskList, setTaskList] = useState([]);

  const refreshList = () => {
    const taskPromise = fetchTasks();
    taskPromise
      .then((response) => {
        console.log('Server Data', response);
        setTaskList(response.data);
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  };

  useEffect(() => {
    console.log('IT WORKED');
    refreshList();
  }, []);

  const handleClickDelete = (id) => {
    console.log('DELETE TASK', id);
    deleteTasks(id)
    .then((response) => {
      refreshList();
    })
    .catch((err) => {
      console.log('ERROR DELETE', err);
    });
  };

  const handleClickToggleTask = (id) => {
    updateTaskComplete(id)
    .then((response) => {
      refreshList();
    })
    .catch((err) => {
      console.log('ERROR TOGGLE', err);
    });
  };


  return (
    <div className='App'>
      <Header />
      <AddTaskForm taskRefreshCallback={refreshList} />

      <Grid container spacing={5}>
      {taskList.map((taskData, dataIndex) => {
        return (
          <Grid item xs={5} key={dataIndex}>  
            <h3>{taskData.User}</h3>
            <p>{taskData.Task}</p>
            <Button variant="contained" size="small" color="error" onClick={() => handleClickToggleTask(taskData.id)}>Completed: {taskData.Completed ? 'Yes' : 'No'}</Button>
            <Button variant="outlined" size="small" onClick={(event) => handleClickDelete(taskData.id)}>Delete</Button>
          </Grid>
        );
      })}
      </Grid>
    </div>
  );

}

export default App;
