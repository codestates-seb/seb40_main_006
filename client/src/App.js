import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Mypage from './Pages/Mypage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
