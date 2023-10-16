import React, { ReactNode } from 'react'

const WrapperWIthSpacing = ({ children }: { children: ReactNode }) => {
  return (
    <div className="master-wrapper-content px-2 md:px-0 mx-auto">
      <div className="master-column-wrapper my-6">{children}</div>
    </div>
  )
}

export default WrapperWIthSpacing
