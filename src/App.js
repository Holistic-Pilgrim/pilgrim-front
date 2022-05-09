import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Pilgrim from './components/Pilgrim';
import Home from './components/Home';
import PilgrimDetail from './components/Pilgrim_detail';
import Footer from './components/Footer';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";

import { Toast,ToastContainer } from 'react-bootstrap';

function App() {
  const [tshow, setTShow] = React.useState({"show":false,"msg":"Waiting","head":"Waiting"});
  const ClickShow = (val) => {
    setTShow(val)
  }
  return (
    <div className={`${window.location.pathname=="/" ? 'plcontent2' :'plcontent'}`}>
    <ToastContainer position="top-end" className="p-3" style={{zIndex: 9999}}>
      <Toast onClose={() => setTShow(false)} show={tshow.show} >
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{tshow.msg}</strong>
        </Toast.Header>
        <Toast.Body>{tshow.head}</Toast.Body>
      </Toast>
    </ToastContainer>

      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/pilgrim" element={<Pilgrim />}>
            <Route index element={<Pilgrim />} />
          </Route>
          <Route path="/pilgrim/:token_id" element={<PilgrimDetail tshow={tshow} kclick={ClickShow} />}>
            <Route index element={<PilgrimDetail tshow={tshow} kclick={ClickShow} />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
