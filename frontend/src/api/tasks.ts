import axios from "./axios";

export const getTasksRequest = () => {
  return axios.get("/tasks");
};

export const addTaskRequest = (newTask: string) => {
  return axios.post("/tasks", { text: newTask });
};

export const completeTaskRequest = (id: string) => {
  return axios.put(`/tasks/${id}/complete`);
};

export const updateTaskRequest = (id: string, updatedText: string) => {
  return axios.put(`/tasks/${id}/update`, { text: updatedText });
};

export const deleteTaskRequest = (id: string) => {
  return axios.delete(`/tasks/${id}`);
};
