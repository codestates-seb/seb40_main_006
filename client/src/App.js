import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Mypage from './Pages/Mypage';
import Home from './Pages/Home';
import Category from './Components/Category/Category';
import Header from './Components/Header';
import JamOpen from './Pages/JamOpen';
import JamDetail from './Pages/JamDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/jamopen" element={<JamOpen />} />
          <Route path="/jamdetail" element={<JamDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
