import { Button } from 'react-bootstrap';
import React from 'react';

export function SubmitButton({ label }) {
  return (
    <Button variant="primary" type="submit">
      {label}
    </Button>
  );
}