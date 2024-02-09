import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types';
import { useAppDispatch } from '../../store';
import { addTask, deleteTask, editTask } from '../../store/tasks/api-actions';
import styles from './task-form.module.scss';

interface TaskFormProps {
  initialTask: Task;
  mode: 'creating' | 'updating';
  setIsShown: (isShown: boolean) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialTask, mode, setIsShown }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [innerTask, setInnerTask] = useState<Task>(initialTask);
  const [isInnerTaskEditting, setIsInnerTaskEditting] = useState(mode === 'creating');
  const [isTaskUpdating, setIsTaskUpdating] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    evt.preventDefault();
    const target = evt.target;
    const { id, value } = target;
    setInnerTask((prev) => prev ? { ...prev, [id]: value } : prev);
  }

  const handleEdit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsInnerTaskEditting(true);
  }

  const handleEditCancel = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setInnerTask(initialTask);
    setIsInnerTaskEditting(false);
    setIsShown(false);
  }

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsTaskUpdating(true);
    if (mode === 'creating') {
      dispatch(addTask(innerTask as Omit<Task, 'id'>));
      setIsShown(false);
    } else {
      dispatch(editTask(innerTask as Task));
    }
    setIsTaskUpdating(false);
    setIsInnerTaskEditting(false);
  };

  const handleDelete = () => {
    if ('id' in innerTask && typeof innerTask.id === 'string') {
      dispatch(deleteTask(innerTask.id));
      setIsShown(false);
      if (mode === 'updating') {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    setInnerTask(initialTask);
  }, [initialTask])

  return (
    <form className={styles.info} onSubmit={handleFormSubmit} action='#'>
      <h1 className={styles.title}>Task Details</h1>
      <p className={styles.text}>
        <label htmlFor='title'>Title:</label>
        <input className={styles.input} type='text' value={innerTask.title} id='title' placeholder='Enter title' onChange={handleChange} disabled={!isInnerTaskEditting || isTaskUpdating} />
      </p>
      <p className={styles.text}>
        <label htmlFor='description'>Description:</label>
        <input className={styles.input} type='text' value={innerTask.description} id='description' placeholder='Enter description' onChange={handleChange} disabled={!isInnerTaskEditting || isTaskUpdating} />
      </p>
      <p className={styles.text}>
        <label htmlFor='status'>Status:</label>
        <select value={innerTask.status} id='status' onChange={handleChange} disabled={!isInnerTaskEditting || isTaskUpdating}>
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </p>
      <ul className={styles.btnList}>
        {!isInnerTaskEditting ? <button className={styles.editBtn} onClick={handleEdit}>
          <span className={styles.editBtnText}>Edit</span>
          <svg width="20" height="20" fill='none'>
            <use href="/icons.svg#edit"></use>
          </svg>
        </button> : ''}
        {isInnerTaskEditting ? <button className={styles.submitBtn} type='submit' disabled={isTaskUpdating}>
          <span className={styles.submitBtnText}>Submit</span>
          <svg width="20" height="20">
            <use href="/icons.svg#submit"></use>
          </svg>
        </button> : ''}
        {isInnerTaskEditting ? <button className={styles.cancelBtn} onClick={handleEditCancel} disabled={isTaskUpdating}>
          <span className={styles.cancelBtnText}>Cancel</span>
          <svg width="20" height="20">
            <use href="/icons.svg#cancel"></use>
          </svg>
        </button> : ''}
        {isInnerTaskEditting && mode === 'updating' ? <button className={styles.deleteBtn} onClick={handleDelete} disabled={isTaskUpdating}>
          <span className={styles.deleteBtnText}>Delete</span>
          <svg width="20" height="20">
            <use href="/icons.svg#delete"></use>
          </svg>
        </button> : ''}
      </ul>
    </form>
  );
};
