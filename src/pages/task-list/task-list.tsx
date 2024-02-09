import React, { useState, MouseEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { TaskForm } from '../../components/task-form/task-form';
import { getTasks, getTasksError, getTasksStatus } from '../../store/tasks/selectors';
import { fetchTasks } from '../../store/tasks/api-actions';
import { useAppDispatch, useAppSelector } from '../../store';
import { ErrorMessage } from '../../components/error/error-message';
import { Loading } from '../../components/loading/loading';
import styles from './task-list.module.scss';

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const tasks = useAppSelector(getTasks);
  const status = useAppSelector(getTasksStatus);
  const error = useAppSelector(getTasksError);

  const [isTaskFormShown, setIsTaskFormShown] = useState(false);

  const handleAddBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsTaskFormShown(true);
  }

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === 'loading') return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Task List</h1>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li className={styles.item} key={task.id}>
            <Link to={`/tasks/${task.id}`}>
              {task.title} - {task.status}
            </Link>
          </li>
        ))}
      </ul>

      {isTaskFormShown ? <TaskForm initialTask={{ title: '', description: '', status: 'Not Completed' }} mode='creating' setIsShown={setIsTaskFormShown} /> : ''}
      
      {!isTaskFormShown ? <button className={styles.addBtn} onClick={handleAddBtnClick}>
        <svg width="40" height="40">
          <use href="/icons.svg#add"></use>
        </svg>
      </button> : ''}
    </div>
  );
};

export default TaskList;
