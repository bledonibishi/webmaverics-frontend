import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from '@/components/User/Header/Header'
import Footer from '@/components/User/Footer'
import Dashboard from '../components/User/dashboard'
import Customer from '../pages/Costumer/Costumer'
import UserInfo from '../components/User/Customer/DetailView/UserInfo'
import LoginPage from '@/auth/pages/LoginPage'
import Wishlist from '@/components/User/Customer/DetailView/Wishlist'
import ProductDetailPage from '@/components/User/products/ProductDetailsPage/ProductDetailPage'
import RegisterPage from '@/auth/pages/SignupPage'
import ProductItem from '@/pages/ProductItem/ProductItem'
const UserRoutes = () => {
  const currentPath = useLocation().pathname
  const isLoginPage =
    currentPath.startsWith('/login') || currentPath === '/register'
  const showHeaderAndFooter = !isLoginPage

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login/:type" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductItem />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:type/:id?" element={<Customer />} />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </>
  )
}

export default UserRoutes
