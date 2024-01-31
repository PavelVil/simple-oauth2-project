export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AddUserFormValues {
    username: string;
    password: string;
    email: string;
}

export interface AddUserFormProps {
    onSubmit: (values: AddUserFormValues) => void;
}

export interface UserListComponentProps {
    users: User[];
    onAddHandler: () => void;
}