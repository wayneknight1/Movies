import React from 'react'
import { useState } from 'react'
function YearFilter({years, setFiltering}) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('Select A Year')
    const yearsDisplay = years.map(year => {
      if(year!==selected){
        return <div className='year-tile' onClick={() =>{
            setFiltering({filtering: true, filteringBy: 'Year', payload: parseInt(year)})
            setSelected(year);
            setOpen(false)
        }}>{year}</div>}
    })
  return (
    <div className='years-container'>
        <div onClick={() => setOpen(true)} className='year-tile'>{selected}</div>
        {open && yearsDisplay}
    </div>
  )
}

export default YearFilter