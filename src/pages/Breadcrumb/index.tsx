import useBreadcrumbs from '@/hooks/useBreadcrumbs'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './style.css'

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs()
  return (
    <nav className="">
      <ul className="d-flex">
        <li>
          <a href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="ty-breadcrumbs__slash">
            {index === breadcrumbs.length - 1 ? (
              breadcrumb.label
            ) : (
              <>
                {console.log('breadcrumb.path', breadcrumb.path)}
                <a href={breadcrumb.path === '/product' ? '' : breadcrumb.path}>
                  {breadcrumb.label}
                </a>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumb
