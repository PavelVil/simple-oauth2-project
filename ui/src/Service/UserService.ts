import axios, {AxiosResponse} from "axios";
import {notification} from "antd";

interface AddUserRequest {
    username: string;
    password: string;
    email: string;
}

interface UserResponse {
    id: string;
    username: string;
    email: string;
}

export const fetchUsers = async (token?: string): Promise<UserResponse[] | undefined> => {
    try {
        const response: AxiosResponse<UserResponse[]> = await axios.get("/task-api/api/v1/admin/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return response.data
    } catch (e) {
        notification.error({
            message: "Error trying to fetch users!"
        })
    }
}

export const createUser = async (user: AddUserRequest, token?: string, id?: string): Promise<AxiosResponse | undefined> => {
    try {
        return await axios.post("/user-api/api/v1/user",
            {
                ...user,
                id: id
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    } catch (e) {
        notification.error({
            message: "Error trying to create user!"
        })
    }
}