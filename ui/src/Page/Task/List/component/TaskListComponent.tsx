import React from "react";
import {Button, Flex, Switch, Table, TableColumnsType} from "antd";
import {Task, TaskListComponentProps} from "../../interfaces";

const columns: TableColumnsType<Task> = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Title",
        dataIndex: "title"
    },
    {
        title: "Description",
        dataIndex: "description"
    },
    {
        title: "Completed",
        dataIndex: "completed",
        render: (completed: boolean) => <Switch disabled={true} value={completed}/>
    },
    {
        title: "User ID",
        dataIndex: "userId"
    },
]

const TaskListComponent: React.FC<TaskListComponentProps> = ({
    onAddHandler,
    onDeleteHandler,
    onEditHandler,
    tasks
                                                             }) => (
    <>
        <h2 style={{textAlign: "center", padding: "0 0 20px 0"}}>Task List</h2>
        <Button style={{margin: 20}} type={"primary"} onClick={onAddHandler}>Add</Button>
        <Table dataSource={tasks} columns={[
            ...columns,
            {
                title: "Action",
                dataIndex: "task_table_action",
                render: (_, task) => <Flex gap={"small"} wrap={"wrap"}>
                    <Button onClick={() => onEditHandler(task.id)}>Update</Button>
                    <Button onClick={() => onDeleteHandler(task.id)} danger>Delete</Button>
                </Flex>
            }
        ]} rowKey={it => it.id}/>
    </>
)

export default TaskListComponent;