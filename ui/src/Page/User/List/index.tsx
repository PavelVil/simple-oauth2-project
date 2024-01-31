import React, {useEffect, useState} from "react";
import {User} from "../interfaces";
import {useAuth} from "react-oidc-context";
import {useNavigate} from "react-router-dom";
import {fetchUsers} from "../../../Service/UserService";
import AppLayout from "../../Layout";
import UserListComponent from "./component/UserListComponent";

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers(auth.user?.access_token)
            .then(userList => setUsers(userList || []))
    }, [auth])

    const onAddHandler = () => {
        navigate("/user/add")
    }

    return (
        <AppLayout>
            <UserListComponent users={users.length ? users : []} onAddHandler={onAddHandler}/>
        </AppLayout>
    )
}

export default UserListPage