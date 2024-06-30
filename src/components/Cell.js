import React from 'react'

function Cell({children, style, onClick}) {
  return (
    <div className='cell' style={style} onClick={onClick}>{children}</div>
  )
}

export default Cell