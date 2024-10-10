import axios from "./axios";

export const addTaskRequest = (text: string) => {
  return axios.post("/task", { text });
};

export const getTasksRequest = () => {
  return axios.get("/task");
};

export const updateTaskRequest = (updatedText: string, id: number) => {
  return axios.put(`/task/update/${id}`, { updatedText });
};

export const completeTaskRequest = (completed: boolean, id: number) => {
  return axios.put(`/task/complete/${id}`, { completed });
};

export const deleteTaskRequest = (id: number) => {
  return axios.delete(`/task/${id}`);
};
