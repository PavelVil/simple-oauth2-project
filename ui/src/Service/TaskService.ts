import axios, {AxiosResponse} from "axios";
import {notification} from "antd";

interface CreateTaskRequest {
    title: string;
    description: string;
    completed: boolean;
    userId?: string;
}

interface UpdateTaskRequest {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId?: string;
}

interface TaskResponse {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
}

export const fetchTaskById = async (taskId: string, token?: string): Promise<TaskResponse | undefined> => {
    try {
        const response = await axios.get(`/task-api/api/v1/task/${taskId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return response.data
    } catch (e) {
        notification.error({
            message: "Error trying to fetch task!"
        })
    }
}

export const fetchTasks = async (token?: string): Promise<TaskResponse[] | undefined> => {
    try {
        const response = await axios.get("/task-api/api/v1/task", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return response.data
    } catch (e) {
        notification.error({
            message: "Error trying to fetch tasks!"
        })
    }
}

export const createTask = async (task: CreateTaskRequest, token?: string) => {
    try {
        return await axios.post("/task-api/api/v1/task",
            task,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    } catch (e) {
        notification.error({
            message: "Error trying to create task!"
        })
    }
}

export const updateTask = async (task: UpdateTaskRequest, token?: string) => {
    try {
        return await axios.put(`/task-api/api/v1/task/${task.id}`, task, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch (e) {
        notification.error({
            message: "Error trying to update task!"
        })
    }
}

export const deleteTaskById = async (taskId: string, token?: string) => {
    try {
        return await axios.delete(`/task-api/api/v1/task/${taskId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch (e) {
        notification.error({
            message: "Error trying to delete task!"
        })
    }
}