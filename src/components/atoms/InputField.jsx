import { FormControl } from 'react-bootstrap';
import React from 'react';

export function InputField({ type, value, onChange, placeholder }) {
  return (
    <FormControl
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-2"
    />
  );
}