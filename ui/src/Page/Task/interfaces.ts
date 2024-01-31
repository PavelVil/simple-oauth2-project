export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
}

export interface TaskListComponentProps {
    tasks: Task[];
    onAddHandler: () => void;
    onEditHandler: (taskId: string) => void;
    onDeleteHandler: (taskId: string) => void;
}

export interface TaskUpsertFormValues {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface TaskUpsertFormProps {
    onSubmit: (task: TaskUpsertFormValues) => void;
    onBackHandler: () => void;
    task?: TaskUpsertFormValues
}