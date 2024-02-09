export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'Completed' | 'Not Completed';
}

export interface User {
  name: string;
  surname: string;
}

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
