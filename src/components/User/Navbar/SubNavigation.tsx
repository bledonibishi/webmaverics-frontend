import React, { useState } from 'react'
import './style.css'
import BannerDropdown from '@/ui/Dropdown/BannerDropdown'
import TestImage from '@/assets/images/asus.png'
import Computer from '@/assets/images/kompjuterDp.png'
import Laptop from '@/assets/images/laptopDd.png'
import Server from '@/assets/images/server.png'

type props = {
  handleDropdownVisibility: (isVisible: boolean) => void
  handleDropdownMouseLeave: () => void
  handleLiMouseEnter: () => void
  handleLiMouseLeave: () => void
  handleDropdownMouseEnter: () => void
}

const SubNavigation = ({
  handleDropdownVisibility,
  handleLiMouseEnter,
  handleDropdownMouseLeave,
  handleLiMouseLeave,
  handleDropdownMouseEnter,
}: props) => {
  return (
    <div className="header-menu d-flex bg-white shadow-md justify-content-center mb-6 align-items-center">
      <ul
        className="top-menu grid grid-cols-10 grid-flow-col notmobile position-relative  p-0"
        onMouseLeave={handleLiMouseLeave}
      >
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Kompjuter,laptop & server
            </a>
            <BannerDropdown
              buttonContent="test"
              content="first dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Computer: {
                    items: [
                      'Gjirafa50Buildings',
                      'Gaming',
                      'All in one(AiO)',
                      'Mini PC',
                    ],
                    image: Computer,
                  },
                },
                {
                  Laptop: {
                    items: ['Gaming', 'Business', 'Home', 'School'],
                    image: Laptop,
                  },
                },
                {
                  Server: {
                    items: ['items', 'NAS', 'Tower', 'UPS'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>

        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Celular,tablet & navigim
            </a>
            <BannerDropdown
              content="second dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              TV,audio & foto
            </a>
            <BannerDropdown
              buttonContent="test"
              content="third dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Gaming
            </a>

            <BannerDropdown
              buttonContent="test"
              content="fourth dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              SMART
            </a>

            <BannerDropdown
              buttonContent="test"
              content="fifth dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Aksesore
            </a>

            <BannerDropdown
              buttonContent="test"
              content="seventh dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Pjese per kompjutere
            </a>

            <BannerDropdown
              buttonContent="test"
              content="eight dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Outlet
            </a>

            <BannerDropdown
              buttonContent="test"
              content="nine dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Qka ka tre?
            </a>

            <BannerDropdown
              buttonContent="test"
              content="ten dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
        <li
          className={`parent-category-active d-flex category-item px-3 md:px-0 align-items-center `}
          onMouseEnter={handleLiMouseEnter}
        >
          <div
            className="overlay-container"
            onMouseEnter={handleDropdownMouseEnter}
          >
            <a
              className="category-item-content text-sm py-1 hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
              href=""
            >
              Apple?
            </a>

            <BannerDropdown
              buttonContent="test"
              content="ten dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: Computer,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Laptop,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Server,
                  },
                },
              ]}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default SubNavigation
