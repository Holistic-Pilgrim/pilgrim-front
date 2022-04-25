import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Pilgrim from './components/Pilgrim';
import PilgrimDetail from './components/Pilgrim_detail';
import Footer from './components/Footer';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pilgrim />}>
            <Route index element={<Pilgrim />} />
          </Route>
          <Route path="/pilgrim/:token_id" element={<PilgrimDetail />}>
            <Route index element={<PilgrimDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
