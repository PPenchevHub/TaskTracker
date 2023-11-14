import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const getTasks = () => {
  return axios.get(`${API_URL}/tasks`);
};

export const createTask = (taskData) => {
  return axios.post(`${API_URL}/tasks`, taskData);
};

export const updateTask = (taskId, taskData) => {
  return axios.put(`${API_URL}/tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`);
};

export const assignTask = (taskId) => {
  return axios.post(`${API_URL}/tasks/${taskId}/assign`);
};
