import axios from "./axios";

export const getTasksRequest = () => {
  return axios.get("/tasks");
};

export const addTaskRequest = (newTask: string) => {
  return axios.post("/tasks", { text: newTask });
};

export const completeTaskRequest = (id: number, completed:boolean) => {
  return axios.put(`/tasks/${id}/complete`, {completed: completed});
};

export const updateTaskRequest = (id: number, updatedText: string) => {
  return axios.put(`/tasks/${id}/update`, { text: updatedText });
};

export const deleteTaskRequest = (id: number) => {
  return axios.delete(`/tasks/${id}`);
};
