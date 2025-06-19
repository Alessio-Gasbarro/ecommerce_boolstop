import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import Videogames from './pages/Videogames';
=======
import Basket from './pages/Basket'

>>>>>>> create/basket-page
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/all" element={<Videogames />} />
=======
        <Route path="/basket" element={<Basket />} />
>>>>>>> create/basket-page
      </Routes>
    </BrowserRouter>
  );
}