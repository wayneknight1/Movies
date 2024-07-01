import React from 'react'
import Movies from './Movies'
import './style.css'
import Filter from './components/Filter'
import YearFilter from './components/YearFilter'
import { useEffect, useState } from 'react'
function App() {
  const [movies,setMovies] = useState([])
  const [genres,setGenres] = useState([])
  const [years,setYears] = useState([])
  const [filtering, setFiltering] = useState({filteringBy: '', filtering: false, payload: ''})
  useEffect(() =>{
    const options = {
        method: 'GET',
        headers:{
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzM1YmZmZTU2NjQ2ZTIyZTdlMDI4YzUxNzYyMDcwMyIsIm5iZiI6MTcxOTY0MjAxOC4zNzU2MjEsInN1YiI6IjY2N2VhNTE3YTUwNGY3NDdjMmRjZjc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zK1jSuAiy5nxydO0TejUAz74szF_2AFjKgorCInWzPc'
        }
    }
fetch('https://api.themoviedb.org/3/discover/movie',options).then(result => result.json()).then(results =>{ 
    setMovies(results.results)
    const availableYears = [];
    results.results.forEach(movie => {
      // console.log(parseInt(movie.release_date.split('-')[0]))
      availableYears.push(parseInt(movie.release_date.split('-')[0]))
    })
    console.log(`available years are ${availableYears}`)
    let finalYears = [...new Set(availableYears)]
    setYears(finalYears)
})
fetch('https://api.themoviedb.org/3/genre/movie/list',options).then(result => result.json()).then(results =>{
    setGenres(results.genres);
    })
},[])
  return (
    <div className='outer-container'>
        <Movies genres={genres} movies={movies} setMovies={setMovies} filtering = {filtering}/>
        <Filter genres={genres} filtering = {filtering} setFiltering = {setFiltering}/>
        <YearFilter years = {years} setFiltering = {setFiltering}/>
    </div>
  )
}

export default App