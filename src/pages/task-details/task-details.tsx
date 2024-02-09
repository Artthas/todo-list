import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { TaskForm } from '../../components/task-form/task-form';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { getTaskById, getTasksError, getTasksStatus } from '../../store/tasks/selectors';
import { fetchTaskById } from '../../store/tasks/api-actions';
import { ErrorMessage } from '../../components/error/error-message';
import { Loading } from '../../components/loading/loading';
import styles from './task-details.module.scss';

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const dispatch = useAppDispatch();

  const task = useAppSelector((state: RootState) => getTaskById(state, taskId!));
  const status = useAppSelector(getTasksStatus);
  const error = useAppSelector(getTasksError);
  
  useEffect(() => {
    if (taskId && !task) {
      dispatch(fetchTaskById(taskId));
    }
  }, [task, taskId, dispatch]);

  if (status === 'loading') return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!task) return <ErrorMessage message='Task not found' />;

  return (
    <div className={styles.wrapper}>
      
      <TaskForm initialTask={task} mode='updating' setIsShown={() => {}} />

      <Link className={styles.link} to="/">Back to Tasks List</Link>
    </div>
  );
};

export default TaskDetails;
