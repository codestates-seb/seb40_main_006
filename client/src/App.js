import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Mypage from './Pages/Mypage';
import Home from './Pages/Home';
import Category from './Components/Category/CategoryResult';
import Header from './Components/Header/Header';
import JamDetail from './Pages/JamDetail';
import JamMake from './Pages/JamMake';
import PageNotFound from './Pages/NotFound';
import Rending from './Pages/Rending';

function App() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Rending />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route
            path="/jammake"
            element={<JamMake isEdit={isEdit} setIsEdit={setIsEdit} />}
          />
          <Route
            path="/jamdetail"
            element={<JamDetail isEdit={isEdit} setIsEdit={setIsEdit} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
