// src/components/atoms/Input.jsx
import React from "react";
import { Form } from "react-bootstrap";

export default function Input({
  type = "text",
  placeholder = "",
  name = "",
  value = "",
  onChange = () => {},
  required = false,
  autoComplete = "",
  className = "",
  disabled = false,
  ...props
}) {
  // Si es textarea, usamos Form.Control con `as="textarea"`
  if (type === "textarea") {
    return (
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full px-4 py-2.5 text-sm text-gray-900
                    border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    outline-none transition-all resize-none
                    placeholder:text-gray-400
                    ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-500" : ""} ${className}`}
        {...props}
      />
    );
  }

  // Si es input normal
  return (
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      className={`w-full px-4 py-2.5 text-sm text-gray-900
                  border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  outline-none transition-all
                  placeholder:text-gray-400
                  ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-500" : ""} ${className}`}
      {...props}
    />
  );
}