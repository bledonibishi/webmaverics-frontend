import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './style.css'

type CustomMenuProps = {
  // isOpen: boolean
  icon?: ReactNode
  children: ReactNode
  // onCloseMenu: () => void
  buttonContent?: ReactNode
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  // isOpen,
  icon,
  children,
  // onCloseMenu,
  buttonContent,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [menuWidth, setMenuWidth] = useState<number | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      setMenuWidth(buttonRect.width)
    }
    setIsOpen((state) => !state)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (isOpen && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        setMenuWidth(buttonRect.width)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  const menuStyle: React.CSSProperties = {
    width: menuWidth !== null ? `${menuWidth}px` : 'auto',
  }

  return (
    <>
      <div
        className="custom-menu__btn cursor-pointer nav-btn d-flex align-items-center"
        ref={buttonRef}
        onClick={openMenu}
      >
        {buttonContent && <span className="pr-1">{buttonContent}</span>}
        {icon}
      </div>
      {isOpen && (
        <div className="custom-menu" style={menuStyle}>
          {children}
          <button onClick={closeMenu}>Close</button>
        </div>
      )}
    </>
  )
}

export default CustomMenu
