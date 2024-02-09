import { RootState } from "..";

// Селектор для получения всех задач
export const getTasks = (state: RootState) => state.tasks.tasks;

// Селектор для получения конкретной задачи по ID
export const getTaskById = (state: RootState, taskId: string) => state.tasks.tasks.find((task) => task.id?.toString() === taskId);

// Селектор для получения статуса загрузки задач
export const getTasksStatus = (state: RootState) => state.tasks.status;

// Селектор для получения ошибки при работе с задачами
export const getTasksError = (state: RootState) => state.tasks.error;
