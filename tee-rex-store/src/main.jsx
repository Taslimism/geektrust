import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import Product from './pages/Product';
import Cart from './pages/Cart';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>,
);
