import React from "react";
import { Form } from "react-bootstrap";

function Input({ id, className = "", type = "text", ...props }) {
  const componentProps = {
    id,
    className,
    ...(type === "textarea" ? { as: "textarea" } : { type }),
    ...props,
  };
  return <Form.Control {...componentProps} data-testid={id} />;
}

export { Input };

