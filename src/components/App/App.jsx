import { useState, useEffect } from 'react';
import Header from '../App/Header/Header'
import { fetchTasks, deleteTasks, updateTaskComplete } from '../../tasklistApi/tasklist.api';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

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
    <div>
      <Header />
      <AddTaskForm taskRefreshCallback={refreshList} />

      {taskList.map((taskData, dataIndex) => {
        return (
          <div key={dataIndex}>
            <h3>{taskData.User}</h3>
            <p>{taskData.Task}</p>
            <button onClick={(event) => handleClickDelete(taskData.id)}>Delete</button>
            <button onClick={() => handleClickToggleTask(taskData.id)}>Completed: {taskData.Completed ? 'True' : 'False'}</button>
            </div>
        );
      })}
    </div>
  );

}

export default App;
