import { instance as axios } from "./axios";

export const getTasksRequest = (category, priority, status) => {
  const urlSearchParams = new URLSearchParams();
  if (category) urlSearchParams.set("category", category.toLowerCase());
  if (priority) urlSearchParams.set("priority", priority.toLowerCase());
  if (status) urlSearchParams.set("done", status.toLowerCase());
  const url = `/tasks?${urlSearchParams.toString()}`;
  return axios.get(url);
};
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

export const createTaskRequest = (task) => axios.post(`/tasks`, task);

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);

export const finishTaskRequest = (id) => axios.put(`/tasks/finish/${id}`);
