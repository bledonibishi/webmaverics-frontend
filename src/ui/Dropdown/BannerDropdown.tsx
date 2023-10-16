import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css' // Make sure to import the library's CSS
import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  ReactNode,
  useState,
} from 'react'

type Category = {
  [category: string]: {
    items: string[]
    image: string
  }
}

type DropdownProps = {
  content: ReactNode
  buttonContent?: string
  onVisibilityChange: (isVisible: boolean) => void
  categories: Category[]
}

const BannerDropdown = ({
  buttonContent,
  content,
  onVisibilityChange,
  categories,
}: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <ul className="sublist first-level gap-y-2.5 text-start">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '33% 33% 33%',
          columnGap: '50px',
        }}
      >
        {categories.map((categoryObject, index) => {
          const categoryKey = Object.keys(categoryObject)[0]
          const { items, image } = categoryObject[categoryKey]
          return (
            <li
              className="category-item px-3 md:px-0 align-items-center d-flex"
              key={index}
            >
              <div className="">
                <img
                  src={image}
                  alt=""
                  className="max-w-100 max-h-full object-contain"
                />
              </div>
              <div className="">
                <a
                  href=""
                  className="category-item-content text-sm  hover:underline font-medium d-flex px-2 text-sm text-gray-700"
                >
                  {categoryKey}
                </a>
                <ul className="second-level p-0 m-0 d-flex">
                  {items.map((item, itemIndex) => (
                    <li
                      className="category-item  pl-0 md:px-0 align-items-center "
                      key={itemIndex}
                    >
                      <a
                        href=""
                        className="category-item-content text-xs  hover:underline font-medium d-flex align-items-center justify-content-center px-2 text-sm text-gray-700"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </div>
    </ul>
  )
}

export default BannerDropdown

{
  /* {isMenuOpen && (
        <Menu menuButton={<p>'test'</p>} align="start" direction="bottom">
          <div><MenuItem>{content}</MenuItem></div>
        </Menu>
      )} */
}
// </div>
