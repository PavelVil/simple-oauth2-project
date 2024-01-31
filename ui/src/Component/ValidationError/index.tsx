import React from "react";
import {FormikErrors, FormikTouched} from "formik";

const ValidationError: React.FC<{
    fieldName: string;
    touched: FormikTouched<any>,
    errors: FormikErrors<any>
}> = ({fieldName, touched, errors}) => {
    if (touched[fieldName] && errors[fieldName]) {
        return (
            <div style={{color: "red"}}>{errors[fieldName] as any}</div>
        )
    }

    return null;
}

export default ValidationError;