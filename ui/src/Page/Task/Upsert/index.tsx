import React, {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {useNavigate} from "react-router-dom";
import {Task, TaskUpsertFormValues} from "../interfaces";
import {useParams} from "react-router";
import {createTask, fetchTaskById, updateTask} from "../../../Service/TaskService";
import {notification} from "antd";
import AppLayout from "../../Layout";
import TaskUpsertForm from "./component/TaskUpsertForm";

const TaskUpsertPage: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | undefined>(undefined)
    const {taskId} = useParams<string>()

    useEffect(() => {
        if (taskId) {
            fetchTaskById(taskId, auth.user?.access_token)
                .then(data => setTask(data))
        }
    }, [auth])

    const create = async (task: TaskUpsertFormValues) => {
        createTask({
            title: task.title,
            description: task.description,
            completed: task.completed,
            userId: auth.user?.profile?.sub
        }, auth.user?.access_token)
            .then(response => {
                if (response?.status === 201) {
                    notification.success({
                        message: "Task created"
                    })
                    navigate("/task")
                }
            })
    }

    const update = async (task: TaskUpsertFormValues) => {
        updateTask({
            id: taskId!!,
            title: task.title,
            description: task.description,
            completed: task.completed,
            userId: auth.user?.profile?.sub
        }, auth.user?.access_token)
            .then(response => {
                if (response?.status === 200) {
                    notification.success({
                        message: "Task updated"
                    })
                    navigate("/task")
                }
            })
    }

    const onSubmit = async (task: TaskUpsertFormValues) => {
        if (taskId) {
            await update(task)
        } else {
            await create(task)
        }
    }

    const onBackHandler = () => {
        navigate("/task")
    }

    return (
        <AppLayout>
            <TaskUpsertForm task={task} onSubmit={onSubmit} onBackHandler={onBackHandler}/>
        </AppLayout>
    )
}

export default TaskUpsertPage;