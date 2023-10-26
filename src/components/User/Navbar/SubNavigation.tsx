import React, { useState } from 'react'
import './style.css'
import BannerDropdown from '@/ui/Dropdown/BannerDropdown'
import TestImage from '@/assets/images/asus.png'
import Computer from '@/assets/images/kompjuterDp.png'
import Laptop from '@/assets/images/laptopDd.png'
import Server from '@/assets/images/server.png'
import CelularImage from '@/assets/images/celularbanner.png'
import Gps from '@/assets/images/gps.png'
import Tablet from '@/assets/images/tablet.png'
import Ebook from '@/assets/images/ebook.png'
import Tv from '@/assets/images/tv.png'
import Audio from '@/assets/images/audiosmallbanner.png'
import Foto from '@/assets/images/fotosmallbanner.png'
import Video from '@/assets/images/videosmallbanner.png'
import Konzol from '@/assets/images/konzolasmallbanner.png'
import Reality from '@/assets/images/realitysmallbanner.png'
import Videolojra from '@/assets/images/videolojrasmallbanner.png'
import Suvenira from '@/assets/images/suvenirasmallbanner.png'
import SmartHome from '@/assets/images/smarthomesmallbanner.png'
import Sport from '@/assets/images/sportsmallbanner.png'
import LodraSmart from '@/assets/images/lodrasmartsmallbanner.png'
import Shendet from '@/assets/images/shendetsmallbanner.png'
import Printer from '@/assets/images/printersmallbanner.png'
import Monitor from '@/assets/images/monitorsmallbanner.png'
import Mouse from '@/assets/images/mouseSmallBanner.png'
import Kufje from '@/assets/images/kufjeSmallBanner.png'
import KartelGrafike from '@/assets/images/kartelagrafikeSmallBanner.png'
// import Procesor from '@/assets/images/procesorSmallBanner.png'
import PllakaAme from '@/assets/images/pllakaameSmallBanner.png'
import MemorieOperative from '@/assets/images/memorieOperativeSmallBanner.png'
import AppleLogo from '@/assets/images/appleSmallBannerLogo.png'

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
              Computer,Laptop & Server
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
              Celular,Tablet & Navigim
            </a>
            <BannerDropdown
              content="second dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  Telephone: {
                    items: ['Touchscreen', 'Pieces', 'Classic', 'stable'],
                    image: CelularImage,
                  },
                },
                {
                  Tablet: {
                    items: ['Apple', 'Android', 'Classic', 'Accessory'],
                    image: Tablet,
                  },
                },
                {
                  Ebook: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Ebook,
                  },
                },
                {
                  GPSnavigation: {
                    items: ['Cars', 'Bicycles', 'Motorcycles', 'Accessory'],
                    image: Gps,
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
              TV,Audio & Foto
            </a>
            <BannerDropdown
              buttonContent="test"
              content="third dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  'TV & Projector': {
                    items: ['TV', 'Accessory', 'Projector'],
                    image: Tv,
                  },
                },
                {
                  Audio: {
                    items: ['Gramaphone', 'Radio', 'Home'],
                    image: Audio,
                  },
                },
                {
                  'Foto & Video': {
                    items: ['Camera', 'Digital camera', 'Telescope'],
                    image: Foto,
                  },
                },
                {
                  'Video players ': {
                    items: ['Multimedia', 'Blue Ray', 'DVD', 'Portative'],
                    image: Video,
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
                  'Console & Accessories ': {
                    items: ['PlayStation 5', 'PlayStation 4', 'X-Box', 'CD'],
                    image: Konzol,
                  },
                },
                {
                  'Virtual Reality': {
                    items: ['VR', '', 'Video Games', 'Accessory'],
                    image: Reality,
                  },
                },
                {
                  'Video Game': {
                    items: ['Consoles for PC', 'Accessory', 'CD-s'],
                    image: Videolojra,
                  },
                },
                {
                  Souvenir: {
                    items: ['Textile', 'Images', 'Pictures', 'Bowl'],
                    image: Suvenira,
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
                  'Smart Home': {
                    items: ['VAcuum Cleaner ', 'Security', 'AC', 'Lightning'],
                    image: SmartHome,
                  },
                },
                {
                  Sport: {
                    items: ['Scoouter', 'Helmets', 'Cycling', 'Accessory'],
                    image: Sport,
                  },
                },
                {
                  'Smart Game & Drone': {
                    items: ['Game', 'Drone', 'Accessory'],
                    image: LodraSmart,
                  },
                },
                {
                  Health: {
                    items: ['Dental Hygiene', 'Scales'],
                    image: Shendet,
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
              Accessories
            </a>

            <BannerDropdown
              buttonContent="test"
              content="seventh dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  'Printer & Colors': {
                    items: ['Ink', 'Chargers', 'Tonners', '3D Printers'],
                    image: Printer,
                  },
                },
                {
                  Monitor: {
                    items: ['Apple', 'Gaming', 'Office'],
                    image: Monitor,
                  },
                },
                {
                  Mouse: {
                    items: ['Gaming', 'Wireless', 'Accessory'],
                    image: Mouse,
                  },
                },
                {
                  'Headphones & Microphone': {
                    items: ['Headphones', 'Gaming', 'Microphone', 'Accessory'],
                    image: Kufje,
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
              Parts for Computers
            </a>

            <BannerDropdown
              buttonContent="test"
              content="eight dropdown"
              onVisibilityChange={handleDropdownVisibility}
              categories={[
                {
                  'Graphic Cards': {
                    items: ['Gaming', 'Proffesionals', 'Accessories'],
                    image: KartelGrafike,
                  },
                },
                {
                  Procesor: {
                    items: ['PC', 'For Servers', 'Workstations'],
                    image: KartelGrafike,
                  },
                },
                {
                  Motherboard: {
                    items: ['Asus', 'Multimedia', 'Gaming'],
                    image: PllakaAme,
                  },
                },
                {
                  'RAM Memory': {
                    items: ['For PC', 'For Laptops', 'Gaming'],
                    image: MemorieOperative,
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
                  Laptop: {
                    items: ['Touch', 'Digital notebook', 'Accessory'],
                    image: Server,
                  },
                },
                {
                  'GPS navigation': {
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
              What's new?
            </a>
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
              <img
                style={{ width: '30px', height: '30px' }}
                src={AppleLogo}
                alt=""
              />
            </a>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default SubNavigation
