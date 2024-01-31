import React, {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {Task} from "../interfaces";
import {useNavigate} from "react-router-dom";
import {deleteTaskById, fetchTasks} from "../../../Service/TaskService";
import AppLayout from "../../Layout";
import TaskListComponent from "./component/TaskListComponent";

const TaskListPage: React.FC = () => {
    const auth = useAuth()
    const [tasks, setTasks] = useState<Task[]>([])
    const navigation = useNavigate()

    useEffect(() => {
        (async () => {
            await getTasks()
        })();
    }, [auth])

    const getTasks = async () => {
        fetchTasks(auth.user?.access_token)
            .then(data => setTasks(data || []))
    }

    const onAddHandler = () => {
        navigation("/task/add")
    }

    const onEditHandler = (taskId: string) => {
        navigation(`/task/edit/${taskId}`)
    }

    const onDeleteHandler = async (taskId: string) => {
        const response = await deleteTaskById(taskId, auth.user?.access_token)
        if (response?.status === 204) {
            await getTasks()
        }
    }

    return (
        <AppLayout>
            <TaskListComponent tasks={tasks.length ? tasks : []}
                               onAddHandler={onAddHandler}
                               onEditHandler={onEditHandler}
                               onDeleteHandler={onDeleteHandler}/>
        </AppLayout>
    )
}

export default TaskListPage