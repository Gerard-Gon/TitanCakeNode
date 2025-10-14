import React from 'react';
import { Button } from 'react-bootstrap';

export function SubmitButton({ label }) {
  return (
    <Button variant="primary" type="submit">
      {label}
    </Button>
  );
}