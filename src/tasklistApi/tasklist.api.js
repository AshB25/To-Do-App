import axios from 'axios';

export const fetchTasks = () => {
    return axios.get('/api/todo');
};

export const postTasks = (taskData) => {
    return axios.post('/api/todo', taskData);
};

export const deleteTasks = (toDoId) => {
    return axios.delete(`/api/todo/${toDoId}`);
};

export const updateTaskComplete = (toDoId) => {
    return axios.put(`/api/todo/${toDoId}`);
};
