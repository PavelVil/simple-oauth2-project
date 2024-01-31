import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {TaskUpsertFormProps, TaskUpsertFormValues} from "../../interfaces";
import {Formik} from "formik";
import {Button, Checkbox, Form, Input} from "antd";
import ValidationError from "../../../../Component/ValidationError";

const validationSchema = yup.object({
    title: yup
        .string()
        .required("Tittle is required"),
})

const initialValues = {
    id: undefined,
    title: "",
    description: "",
    completed: false
}

const TaskUpsertForm: React.FC<TaskUpsertFormProps> = ({onSubmit, onBackHandler, task}) => {
    const [initValues, setInitValues] = useState<TaskUpsertFormValues>(initialValues)

    useEffect(() => {
        if (task) {
            setInitValues(task)
        }
    }, [task])

    return (
        <>
            <h2 style={{textAlign: "center", padding: "0 0 20px 0"}}>{task ? "Update task" : "Add task"}</h2>
            <Formik<TaskUpsertFormValues>
                initialValues={initValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize>
                {(formikProps) => {
                    return <Form
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600, margin: "0 auto"}}
                        onFinish={formikProps.handleSubmit}
                        autoComplete={"off"}>
                        <Form.Item label={"Title"}>
                            <Input name={"title"}
                                   value={formikProps.values.title}
                                   onChange={formikProps.handleChange}/>
                            <ValidationError fieldName={"title"}
                                             touched={formikProps.touched}
                                             errors={formikProps.errors}/>
                        </Form.Item>
                        <Form.Item label={"Description"}>
                            <Input name={"description"}
                                   value={formikProps.values.description}
                                   onChange={formikProps.handleChange}/>
                        </Form.Item>
                        <Form.Item label={"Completed"}>
                            <Checkbox name={"completed"}
                                      checked={formikProps.values.completed}
                                      onChange={formikProps.handleChange}/>
                            <ValidationError fieldName={"email"}
                                             touched={formikProps.touched}
                                             errors={formikProps.errors}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button htmlType={"button"} style={{marginRight: 10}} onClick={onBackHandler}>
                                Back
                            </Button>
                            <Button type={"primary"} htmlType={"submit"}>
                                {task?.id ? "Update" : "Create"}
                            </Button>
                        </Form.Item>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default TaskUpsertForm;