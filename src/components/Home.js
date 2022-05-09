import { utils } from "near-api-js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Form } from 'react-bootstrap';
import HeaderTop from '../assets/header-top.png';
import HeaderBot from '../assets/header-bot.png';
import '../home.css';

import ReactPaginate from 'react-paginate';

function Home() {


  React.useEffect(() => {
  }, [window.accountId]);

 
  return (
    <div className="pilgrim py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col sm={12} md={6} className="bgdrop">
            <h1>Welcome to the Holistic Pilgrim</h1>
            <br/>
            <p>Holistic Pilgrim has no limits and it does not end, in this world any action has a connection with the next, even if you are not aware of it.</p>
            <p>There is no good or bad, no truth or lies. In this world, you can be both a desperate space alien and a cute old man who owns a small bookstore.</p>
            <p>And most importantly, everything in this world is connected.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
