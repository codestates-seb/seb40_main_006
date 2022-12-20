import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Mypage from './Pages/Mypage';
import Home from './Pages/Home';
import Category from './Pages/CategoryResult';
import Header from './Components/Header/Header';
import JamDetail from './Pages/JamDetail';
import JamMake from './Pages/JamMake';
import PageNotFound from './Pages/NotFound';
import Landing from './Pages/Landing';
import Search from './Pages/Search';

function App() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route
            path="/jammake"
            element={<JamMake isEdit={isEdit} setIsEdit={setIsEdit} />}
          />
          <Route
            path="/jammake/edit/:id"
            element={<JamMake isEdit={isEdit} setIsEdit={setIsEdit} />}
          />
          <Route
            path="/jamdetail/:id"
            element={<JamDetail setIsEdit={setIsEdit} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
