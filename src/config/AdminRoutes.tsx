import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import CreateProduct from '@/components/Admin/product'
import Header from '@/components/User/Header/Header'
import Footer from '@/components/User/Footer'
import UpdateProduct from '@/components/Admin/product/updateProduct'
import { useAppSelector } from '@/hooks/hooks'
import ReturningRequests from '@/components/Admin/ReturningRequests'

const AdminRoutes = () => {
  const { user } = useAppSelector((state) => state.auth)

  if (user?.user && user.user.role !== 'admin') {
    return <Navigate to="/access-denied" />
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center p-5">Admin dashboard here</h1>}
        />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/return-requests" element={<ReturningRequests />} />
      </Routes>
      <Footer />
    </>
  )
}

export default AdminRoutes
