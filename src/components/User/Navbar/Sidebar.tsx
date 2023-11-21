import {
  faHeart,
  faHome,
  faReorder,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import fifty from '@/assets/images/i-50-logo.svg'
import Sidebar from 'react-sidebar'

type SidebarProps = {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarNavigation: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const onSetSidebarOpen = (open: boolean) => {
    setSidebarOpen(open)
  }

  return (
    <Sidebar
      sidebar={
        <div className="md:hidden ">
          <div className="d-flex justify-content-between align-items-center bg-primary px-3 py-2">
            <h3 className="text-white text-sm font-semibold w-32 truncate">
              bledon
            </h3>
            <img className="w-8" src={fifty} />
          </div>
          <div
            className="d-flex flex-col border-b px-3"
            id="menu-mobile-top-links"
          >
            <a
              href="/"
              className="w-100 font-semibold text-base py-3 d-flex align-items-center text-gray-700"
            >
              <i className="icon-home-alt-door text-xl text-primary mr-2">
                <FontAwesomeIcon icon={faHome} />
              </i>
              Ballina
            </a>
            <a
              href="/cart"
              className="w-100 font-semibold text-base py-3 d-flex align-items-center text-gray-700"
            >
              <i className="icon-cart-shopping text-xl text-primary mr-2">
                <FontAwesomeIcon icon={faShoppingCart} />
              </i>
              Shporta
            </a>
            <a
              href="/wishlist"
              className="w-100 font-semibold text-base py-3 d-flex align-items-center text-gray-700"
            >
              <i className="icon-heart text-xl text-primary mr-2">
                <FontAwesomeIcon icon={faHeart} />
              </i>
              Lista e dëshirave
            </a>
          </div>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2  text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Kompjuter, Laptop &amp; Server
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Telephones, Tablet & Navigim
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              TV, Audio & Photo
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Gaming
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Smart
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Accessories
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Computer parts
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Outlet
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              What's new
            </a>
          </li>
          <li className="parent-category-active d-flex category-item px-3 md:px-0 align-items-center">
            <div className="w-8 h-8 d-flex justify-content-center align-items-center small-image-container md:hidden">
              <img
                className="max-w-full max-h-full"
                loading="lazy"
                src="https://iqq6kf0xmf.gjirafa.net/images/422c4314-11b1-4fa2-9253-e88412c78061/422c4314-11b1-4fa2-9253-e88412c78061.jpeg"
                alt=""
              />
            </div>
            <a
              className="category-item-content text-xs py-3 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-xs text-gray-700"
              href="/kompjuter-laptop-server"
            >
              Apple
            </a>
          </li>
          <div className="d-flex flex-col border-t px-5 mb-16">
            <span className="text-gray-600 text-xs py-3">
              Pyetje të shpeshta
            </span>
            <span className="text-gray-600 text-xs py-3">Na kontaktoni:</span>
            <span className="text-gray-600 text-xs py-3">
              Email: contact@gjirafa50.com
            </span>
            <span className="text-gray-600 text-xs py-3">
              Tel: +383 45 101 953, +383 38 616 161
            </span>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: 'white',
          //   position: 'absolute',
        },
      }}
    >
      {/* <button
        className="md:hidden"
        style={{ position: 'absolute', top: '15px', left: '15px' }}
        onClick={() => onSetSidebarOpen(true)}
      >
        <FontAwesomeIcon icon={faReorder} />
      </button> */}
      <div
        style={{ position: 'absolute', top: '9px', left: '5px' }}
        className=" nav-i-animation md:hidden"
        onClick={() => onSetSidebarOpen(true)}
      >
        <i
          className="icon-menu-three-lines cursor-pointer text-2xl text-white i-bg-effect"
          id="scroll-anim-icon-menu"
        >
          <FontAwesomeIcon icon={faReorder} />
        </i>
      </div>
    </Sidebar>
  )
}

export default SidebarNavigation
