import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Breadcrumb = {
  label: string
  path: string
}

const useBreadcrumbs = (): Breadcrumb[] => {
  const location = useLocation()
  const [breadcrumb, setBreadcrumbs] = useState<Breadcrumb[]>([])

  useEffect(() => {
    const pathSegments = location.pathname
      .split('/')
      .filter((segment) => segment !== '')

    const newBreadcrumb = pathSegments.map((segment, index) => {
      const breadcrumbPath = `/${pathSegments.slice(0, index + 1).join('/')}`
      return { label: segment, path: breadcrumbPath }
    })

    setBreadcrumbs(newBreadcrumb)
  }, [location.pathname])

  return breadcrumb
}

export default useBreadcrumbs
