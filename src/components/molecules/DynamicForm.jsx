import React from "react";
import { Input } from "../atoms/Input"
import { Form } from 'react-bootstrap';

function DynamicForm({inputs = []}) {
    return (
        <Form data-testid="dynamic-form">
            {inputs.map((input, index) => (
                <Form.Group key={input.id || index}>
                    {input.label && <Form.Label htmlFor={`input-${input.id || index}`}>{input.label}</Form.Label>}
                    <Input id={`input-${input.id || index}`} {...input} />
                    {input.error && <Form.Text className="text-danger">{input.error}</Form.Text>}
                </Form.Group>
        ))}
        </Form>
    )
}

export default DynamicForm;