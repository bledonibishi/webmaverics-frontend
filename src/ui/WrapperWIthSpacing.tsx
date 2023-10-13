import React, { ReactNode } from 'react'

const WrapperWIthSpacing = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ padding: '0% 10%', backgroundColor: '#F7F7F7' }}>
      {children}
    </div>
  )
}

export default WrapperWIthSpacing
