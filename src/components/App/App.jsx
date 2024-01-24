import { useState, useEffect } from 'react';
import Header from '../App/Header/Header'
import { fetchTasks, deleteTasks, updateTaskComplete } from '../../tasklistApi/tasklist.api';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import ButtonColor from '../Button/Button';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


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

  const theme = createTheme({
    palette: {
      black: {
        main: '#424242',
        light: '#bdbdbd',
        dark: '#212121',
        contrastText: '#fafafa',
      },
    },
  });

  const taskSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <div className='App'>
      <Header />
      <AddTaskForm taskRefreshCallback={refreshList} />

      <Grid container spacing={5}>
      {taskList.map((taskData, dataIndex) => {
        return (
          <ThemeProvider theme={theme}>
          <Grid item xs={5} key={dataIndex}>  
            <h3>{taskData.User}</h3>
            <p>{taskData.Task}</p>
            <ButtonColor onClick={() => handleClickToggleTask(taskData.id)}> :{taskData.Completed ? 'Yes' : 'No'} </ButtonColor>
            {/* <Button variant="contained" size="small" color="error" onClick={() => handleClickToggleTask(taskData.id)}>Completed: {taskData.Completed ? 'Yes' : 'No'}</Button> */}
            <Button variant="contained" size="small" color="black" onClick={(event) => handleClickDelete(taskData.id)}>Delete</Button>
          </Grid>
          </ThemeProvider>
        );
      })}
      </Grid>
    </div>
  );

}

export default App;
