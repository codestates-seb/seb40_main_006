import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './Styles/App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Category from './Components/Category/Category';

function App() {
  // const color = palette.colorAccent;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
