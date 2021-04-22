import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useField } from 'formik';

export default function MyTextInput(props) {
    const [field, meta] = useField(props)
    const { placeholder, name, label } =  props;

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input {...field} {...props} />
            { meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ):null}
        </Form.Field>
    )
}