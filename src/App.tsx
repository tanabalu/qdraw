import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home';
import './App.css';

function App() {
  return (
    // 这里的 basename 匹配 vite.config.ts 里的 baseUrl 属性，否则路由会无法匹配
    <BrowserRouter basename='qdraw'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
