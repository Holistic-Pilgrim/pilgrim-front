import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container } from 'react-bootstrap';
import LogoP from '../assets/logo.svg';

function Footer() {
  return (
    <div className={`${window.location.pathname=="/" ? 'footer2' :'footer'}`}>
      <Container>
        <h1 className="text-center" style={{paddingTop: "60px"}}>* HOLISTIC PILGRIMS *</h1>
      </Container>
    </div>
  );
}

export default Footer;
