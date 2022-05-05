import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import LogoP from '../assets/logo.svg';
import { login, logout } from "../utils.js";
import {
  useParams
} from "react-router-dom";

const Header = (props) => {
  let { token_id } = useParams();
  let connectionButton;
  if (window.accountId == null || typeof window.accountId === "undefined" || accountId == "") {
    connectionButton = (<Button variant="outline-warning" onClick={() => login()}>Connect</Button>);
  }else{
    connectionButton = (<Button variant="outline-success" onClick={() => logout()} >{window.accountId}</Button>);
  }

  return (
    <div className="header">
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <div style={{display: "flex", alignItems: "center"}}>
              <div>
                <img src={LogoP} />
              </div>
              <div className="ps-4">
                <span>HOLISTIC <br/> PILGRIM</span>
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/pilgrim">Holistic</Nav.Link>
              <Nav.Link href="/pilgrim">Lore</Nav.Link>
              <Nav.Link href="/pilgrim">Pilgrim</Nav.Link>
            </Nav>
            <div className="d-flex">
              {connectionButton}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
