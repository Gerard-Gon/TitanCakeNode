import React from 'react';
import { Container } from 'react-bootstrap';
import Image from '../components/atoms/Image';
import '../styles/pages/notfound.css'

const image = {
    src: 'https://i.pinimg.com/originals/4b/21/22/4b2122e5164f6a736b0f6fdaa02a8bd9.gif',
    alt: 'Not Found Image',
}

function NotFound() {
  return (
    <Container className="my-5">
      <h2 className='titulo'>PAGINA NO ENCONTRADA<br/> ALERT!!</h2>
      <p className='texto'>NANOMACHINES SON</p>
      <Image src={image.src} alt={image.alt} className="" />
    </Container>
  );
}

export default NotFound;