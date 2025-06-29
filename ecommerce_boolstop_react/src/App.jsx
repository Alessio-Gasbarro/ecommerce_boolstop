import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Videogames from './pages/Videogames';
import Basket from './pages/Basket';
import DefaultLayout from './layouts/DefaultLayout';
import NotFoundPage from './pages/NotFoundPage';
import Wishlist from './pages/Wishlist';
import SingleGame from './pages/SingleGame';
import { NotificationProvider } from './components/NotificationContext';

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<Videogames />} />
            <Route path="/all/:slug" element={<SingleGame />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}