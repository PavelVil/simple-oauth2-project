import React from "react";
import {Button, Table, TableColumnsType} from "antd";
import {User, UserListComponentProps} from "../../interfaces";

const columns: TableColumnsType<User> = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Username",
        dataIndex: "username"
    },
    {
        title: "Email",
        dataIndex: "email"
    }
]

const UserListComponent: React.FC<UserListComponentProps> = ({users, onAddHandler}) => (
    <>
        <h2 style={{textAlign: "center", padding: "0 0 20px 0"}}>User List</h2>
        <Button style={{margin: 20}} type={"primary"} onClick={onAddHandler}>Add</Button>
        <Table dataSource={users} columns={columns} rowKey={it => it.id}/>
    </>
)

export default UserListComponent;