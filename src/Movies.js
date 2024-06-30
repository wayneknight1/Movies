import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Cell from './components/Cell'
function Movies() {
    const [movies,setMovies] = useState([])
    const [genres,setGenres] = useState({})

    const sortBy = (parameter) =>{
        if(parameter === 'Title'){
            setMovies(movies => {
                const sortedMovies =  movies?.sort((a,b) => a.original_title.localeCompare(b.original_title))
                // console.log(`sorted movies are ${JSON.stringify(sortedMovies)}`)
                setMovies(sortedMovies)
            })
        }
        else if(parameter === 'Release Date'){
            setMovies(movies => {
                const sortedMovies =  movies?.sort((a,b) => a.release_date.localeCompare(b.release_date))
                // console.log(`sorted movies are ${JSON.stringify(sortedMovies)}`)
                setMovies(sortedMovies)
            })
        }
        else if(parameter === 'Rating'){
            console.log(`trying to sort by rating`)
            setMovies(movies => {
                const sortedMovies = movies.sort((a,b) => parseInt(a.vote_average) - parseInt(b.vote_average))
                setMovies(sortedMovies)
            })
        }
        else if(parameter === 'Genre'){
            const sortedMovies = [...movies].sort((a,b) => {
               const genreA = genres.find(genre => genre.id === a.genre_ids[0])
               const genreB = genres.find(genre => genre.id === b.genre_ids[0])
               return genreA.name.localeCompare(genreB.name);
            })
            console.log(`sorted according to dates ${JSON.stringify(sortedMovies)}`)
            setMovies(sortedMovies)
        }
    }

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
        // console.log(`movies state is ${JSON.stringify(results)}`)
    })
    fetch('https://api.themoviedb.org/3/genre/movie/list',options).then(result => result.json()).then(results =>{
        setGenres(results.genres);
        // console.log(`genre results are ${JSON.stringify(results.genres)}`)
        })
    },[])

    const headers = ['Title','Release Date','Rating','Genre']
  return (
    <div>
        {/* {console.log(`movies.results is ${JSON.stringify(movies.results)}`)} */}
        {headers.map(header => <Cell onClick = {() => sortBy(header)} style ={{fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer'}}>{header}</Cell>)}
        {movies?.map(movie => {
            return <div className='cell-container'>
                <Cell>{movie.original_title}</Cell> 
                <Cell>{movie.release_date}</Cell>
                <Cell>{movie.vote_average}</Cell>
                <Cell>{Array.from(genres).filter(genre => {
                   if(genre.id === movie.genre_ids[0])
                        return genre.name
                   return false
                })["0"]?.["name"]
                }</Cell>
               
            </div>
        })}
    </div>
  )
}

export default Movies