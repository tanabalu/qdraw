import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home';
import './App.css';

function App() {
  return <Home />;
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App
