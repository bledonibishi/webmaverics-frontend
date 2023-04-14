import React from "react";
import Header from "../components/User/Header/Header";
import Footer from "../components/User/Footer";

import MainContent from "../components/Admin/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/User/dashboard";
function AdminRoutes() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-center p-5">Admin dashboard here</h1>}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default AdminRoutes;
