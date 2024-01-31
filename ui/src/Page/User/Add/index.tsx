import React from "react";
import {useAuth} from "react-oidc-context";
import {useNavigate} from "react-router-dom";
import {AddUserFormValues} from "../interfaces";
import {createUser} from "../../../Service/UserService";
import {notification} from "antd";
import AppLayout from "../../Layout";
import UserAddForm from "./component/UserAddForm";

const UserAddPage: React.FC = () => {
    const auth = useAuth();
    const navigation = useNavigate()

    const onSubmit = (user: AddUserFormValues) => {
        createUser(user, auth.user?.access_token)
            .then(response => {
                if (response?.status === 201) {
                    notification.success({
                        message: "User created"
                    });
                    navigation("/user")
                }
            })
    }

    return (
        <AppLayout>
            <UserAddForm onSubmit={onSubmit}/>
        </AppLayout>
    )
}

export default UserAddPage