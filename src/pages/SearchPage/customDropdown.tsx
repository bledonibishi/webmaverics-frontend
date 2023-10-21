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

const CustomDropdown: React.FC = () => {
  return (
    <Dropdown drop="up-centered" id="custom-dropdown-search">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <span>Sipas Relevancës</span>
        <i className="icon-chevron-line-down text-base text-gray-600 pl-1"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}
        className="selectCustom-options bg-white"
        style={{ inset: '5px auto auto -10px' }}
      >
        <Dropdown.Item
          eventKey="1"
          className="selectCustom-option sort-options bg-white text-xs font-medium d-flex justify-content-center text-gray-600 light-dropdown-hover"
        >
          Sipas Relevancës
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          className="selectCustom-option sort-options bg-white text-xs font-medium d-flex justify-content-center text-gray-600 light-dropdown-hover"
        >
          Qmimi: ulet ne te larte
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
          className="selectCustom-option sort-options bg-white text-xs font-medium d-flex justify-content-center text-gray-600 light-dropdown-hover"
        >
          Qmimi: larte ne te ulet
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="1"
          className="selectCustom-option sort-options bg-white text-xs font-medium d-flex justify-content-center text-gray-600 light-dropdown-hover"
        >
          Me te rejat
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CustomDropdown
