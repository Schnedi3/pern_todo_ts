import axios from "./axios";

// get request
export const getTasksRequest = () => {
  return axios.get("/tasks");
};

// add request
export const addTaskRequest = (newTask: string) => {
  return axios.post("/tasks", { text: newTask });
};

// complete request
export const completeTaskRequest = (id: string) => {
  return axios.put(`/tasks/${id}`);
};

// update request
export const updateTaskRequest = (id: string, updatedText: string) => {
  return axios.put(`/tasks/${id}`, { text: updatedText });
};

// delete request
export const deleteTaskRequest = (id: string) => {
  return axios.delete(`/tasks/${id}`);
};
