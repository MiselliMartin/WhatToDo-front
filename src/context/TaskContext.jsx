import { createContext, useContext, useState } from "react";
import { createTaskRequest, updateTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, finishTaskRequest } from '../api/tasks'

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within a TaskProvider");
  return context;
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);

  const getTasks = async (category, priority, status) => {
    try {
      const res = await getTasksRequest(category, priority, status)
      setTasks(res.data)
      return res
    } catch (error) {
      setErrors(error.data)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res
    } catch (error) {
      setErrors(error.data)
    }
  }


  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      return res
    } catch (error) {
      setErrors(error.data)
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task)
      return res
    } catch (error) {
      setErrors(error.data)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      return res
    } catch (error) {
      setErrors(error.data)
    }
  }

  const finishTask = async (id) => {
    try {
      const res = await finishTaskRequest(id)
      return res
    } catch (error) {
      setErrors(error.data)
    }
  }

  return (
    <TaskContext.Provider value={{ createTask, getTasks, tasks, updateTask, deleteTask, finishTask, getTask, errors }}>
      {children}
    </TaskContext.Provider>
  )
};