import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Videogames from './pages/Videogames';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<Videogames />} />
      </Routes>
    </BrowserRouter>
  );
}