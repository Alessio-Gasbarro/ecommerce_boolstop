import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Videogames from './pages/Videogames';
import Basket from './pages/Basket';
import DefaultLayout from './layouts/DefaultLayout';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePopup from './components/WelcomePopup';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Videogames />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}