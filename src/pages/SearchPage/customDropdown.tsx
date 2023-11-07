import React, { useState, ReactNode, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

const CustomToggle = React.forwardRef<
  HTMLAnchorElement,
  { children: ReactNode; onClick: (e: React.MouseEvent) => void }
>(({ children, onClick }, ref) => (
  <div className="selectCustom-trigger d-flex justify-content-between align-items-center text-xs text-gray-700 bg-white font-medium filter-products-categories">
    <a
      // href=""

      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
      &#x25bc;
    </a>
  </div>
))

const CustomMenu = React.forwardRef<
  HTMLDivElement,
  {
    children: ReactNode
    style: React.CSSProperties
    className: string
    'aria-labelledby': string
  }
>(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
  const [value, setValue] = useState<string>('')

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
          (child) =>
            !value ||
            (child as React.ReactElement).props.children
              .toString()
              .toLowerCase()
              .startsWith(value)
        )}
      </ul>
    </div>
  )
})
type CustomDropdownProps = {
  setSortOption: React.Dispatch<React.SetStateAction<string>>
  sortOption: string
  setShowNewProducts: React.Dispatch<React.SetStateAction<boolean>>
  setShowDiscountedProducts: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  setSortOption,
  sortOption,
  setShowNewProducts,
  setShowDiscountedProducts,
}) => {
  const handleOptionSelect = (event: React.SyntheticEvent<HTMLElement>) => {
    const eventKey = event.currentTarget.getAttribute('eventkey')
    console.log('eventKey', eventKey)
    if (eventKey === '1') {
      setShowDiscountedProducts(true)
    } else if (eventKey === '2') {
      setSortOption('priceLowToHigh')
      setShowNewProducts(false)
      setShowDiscountedProducts(false)
    } else if (eventKey === '3') {
      setSortOption('priceHighToLow')
      setShowNewProducts(false)
      setShowDiscountedProducts(false)
    }
  }
  return (
    <Dropdown drop="up-centered" id="custom-dropdown-search">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <span>With relevance</span>
        <i className="icon-chevron-line-down text-base text-gray-600 pl-1"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}
        className="selectCustom-options bg-white"
        style={{ inset: '5px auto auto -10px' }}
      >
        <Dropdown.Item
          eventKey="1"
          onClick={() => setSortOption('hasDiscount')}
        >
          With discount
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => setSortOption('priceLowToHigh')}
        >
          Price: low to high
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
          onClick={() => setSortOption('priceHighToLow')}
        >
          Price: high to low
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="4"
          onClick={() => setSortOption(' newProducts')}
        >
          New products
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CustomDropdown
