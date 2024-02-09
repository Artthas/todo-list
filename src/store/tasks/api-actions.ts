import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../../types';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Task[]>('http://localhost:3030/tasks');
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch tasks');
  }
});

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Task>(`http://localhost:3030/tasks/${taskId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Unable to fetch task details');
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData: Omit<Task, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<Task>('http://localhost:3030/tasks', taskData);
      return response.data;
    } catch (err) {
      return rejectWithValue('Unable to add task');
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const response = await axios.put<Task>(`http://localhost:3030/tasks/${taskData.id}`, taskData);
      return response.data;
    } catch (err) {
      return rejectWithValue('Unable to edit task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3030/tasks/${taskId}`);
      return taskId;
    } catch (err) {
      return rejectWithValue('Unable to delete task');
    }
  }
);