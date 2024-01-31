import React from "react";
import * as yup from "yup";
import {AddUserFormProps, AddUserFormValues} from "../../interfaces";
import {Formik} from "formik";
import {Button, Form, Input} from "antd";
import ValidationError from "../../../../Component/ValidationError";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(4, "Password should be of minimum 4 characters length")
        .required("Password is required"),
    username: yup
        .string()
        .min(4, "Username should be of minimum 4 characters length")
        .required("Username is required")
})

const initialValues = {
    username: "",
    email: "",
    password: ""
}

const UserAddForm: React.FC<AddUserFormProps> = ({onSubmit}) => {
    return (
        <>
            <h2 style={{textAlign: "center", padding: "0 0 20px 0"}}>Add user</h2>
            <Formik<AddUserFormValues>
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {(formikProps) => {
                    return <Form
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600, margin: "0 auto"}}
                        onFinish={formikProps.handleSubmit}
                        autoComplete={"off"}>
                        <Form.Item label={"Username"}>
                            <Input name={"username"}
                                   value={formikProps.values.username}
                                   onChange={formikProps.handleChange}/>
                            <ValidationError fieldName={"username"}
                                             touched={formikProps.touched}
                                             errors={formikProps.errors}/>
                        </Form.Item>
                        <Form.Item label={"Password"}>
                            <Input.Password name={"password"}
                                   value={formikProps.values.password}
                                   onChange={formikProps.handleChange}/>
                            <ValidationError fieldName={"password"}
                                             touched={formikProps.touched}
                                             errors={formikProps.errors}/>
                        </Form.Item>
                        <Form.Item label={"Email"}>
                            <Input name={"email"}
                                   value={formikProps.values.email}
                                   onChange={formikProps.handleChange}/>
                            <ValidationError fieldName={"email"}
                                             touched={formikProps.touched}
                                             errors={formikProps.errors}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type={"primary"} htmlType={"submit"}>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default UserAddForm;