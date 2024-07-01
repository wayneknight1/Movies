import React from 'react'
import { useState } from 'react'
function Filter({genres,filtering, setFiltering}) {
    const [open,setOpen] = useState(false)
    const [selected,setSelected] = useState('Select An Option')
    const filterHandler = () =>{
        setFiltering({filtering: true, filteringBy: 'Genre', payload: selected})
    }

    const clearFilters = () =>{
        setFiltering({filtering: false, filteringBy: undefined, payload:''})
    }
    return <div className='dropdown-container'>
        <div onClick={() => setOpen(!open)} className='selected-dropdown'>{selected}</div>
        {open && genres.filter(genre => genre.name !== selected).map(genre => {
            return <div className='dropdown-option' onClick={() => {setSelected(genre.name); setOpen(false)}}>{genre.name}</div>
        })}
        <button className = 'filter-button' onClick={filterHandler}>Filter Results</button>
        <button className = 'clear-button' onClick={clearFilters}>Clear Filters</button>
    </div>
}

export default Filter