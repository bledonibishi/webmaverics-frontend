import React from 'react';
import Header from '../components/User/Header/Header';
import Footer from '../components/User/Footer';
import { Routes, Route, Switch, Navigate } from 'react-router-dom';
import Dashboard from '../components/User/dashboard';
import CartDetailPage from '../Cart/pages/CartDetailsPage/CartDetailPage';
function UserRoutes() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/product/:id" element={<CartDetailPage />} />
          {/* <Route path="/products/:id" element={<h1>`Product ${id} here`</h1>} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default UserRoutes;
