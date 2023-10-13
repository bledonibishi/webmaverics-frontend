import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import './loading.css'

type loadingBarProps = {
  height?: string
  size?: number | string
}

const LoadingBar = ({ height, size }: loadingBarProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {loading && (
        <div className="loading-bar" style={{ height: `${height}` }}>
          <ClipLoader
            color={'rgb(54, 215, 183)'}
            loading={loading}
            // height={7}
            size={size}
            // width={300}
          />
        </div>
      )}
    </>
  )
}

export default LoadingBar
