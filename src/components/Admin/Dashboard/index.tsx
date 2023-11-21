import React from 'react'
import './style.css'
import Banner from '@/assets/images/payment/banner.png'
import SmallBanner from '@/assets/images/smallBaner.png'
import SmallBannerRight from '@/assets/images/payment/small-banner-right.png'
import DashboardSlider from '@/ui/Sliders/DashboardSlider'
import { ToastContainer, toast } from 'react-toastify'
import ProductList from '@/components/User/products'

function AdminDashboard() {
  return (
    <div className="dashboard">
      <div className="" style={{ background: '#f7f7f7', opacity: '1' }}>
        <DashboardSlider />
        <div className="small-banner master-wrapper-content mx-auto pl-0 pr-0">
          <img src={SmallBanner} alt="" className="w-100" />
        </div>
        <div className="p-3">
          <ProductList />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
