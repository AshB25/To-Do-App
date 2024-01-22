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

  return (
    <div>
      <Header />
      <AddTaskForm taskRefreshCallback={refreshList} />
    </div>
  );

}

export default App;
