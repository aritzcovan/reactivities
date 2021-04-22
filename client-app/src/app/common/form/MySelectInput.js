import React from "react";
import { Form, Label, Select } from "semantic-ui-react";
import { useField } from "formik";

export default function MySelectInput(props) {
  const [field, meta, helpers] = useField(props);
  const { placeholder, name, label, options } = props;

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        options={options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
