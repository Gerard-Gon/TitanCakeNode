import { useState } from 'react';
import React from 'react';


export function ValidatedForm() {
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');
   const handleSubmit = (event) => {
       event.preventDefault();
       if (!email.includes('@')) {
           setError('Email inválido');
       } else {
           setError('');
       }
   };
   return (
       <form onSubmit={handleSubmit}>
           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
           {error && <p style={{ color: 'red' }}>{error}</p>}
           <button type="submit">Enviar</button>
       </form>
   );
}
