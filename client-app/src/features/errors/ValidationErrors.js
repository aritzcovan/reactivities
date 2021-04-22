import React from "react";
import { Message } from "semantic-ui-react";

export default function ValidationErrors(props) {
  const { errors } = props;

  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
