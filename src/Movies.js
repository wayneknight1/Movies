import React from 'react'
import Cell from './components/Cell'
import { useEffect } from 'react'
import { useState } from 'react'
function Movies({genres,movies,setMovies,filtering}) {
    const [filteredMoviesByYear, setFilteredMoviesByYear] = useState([]);
    useEffect(()=>{
        if(filtering.filtering && filtering.filteringBy==='Year'){
            setFilteredMoviesByYear(movies.filter(movie => {
                const parseYear = parseInt(movie.release_date.split('-')[0])
                return parseYear === parseInt(filtering.payload)
            }).map(movie =>{
                return <div className='cell-container movie-cell-container'>
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
            }))
        }
    },[filtering])
    const sortBy = (parameter) =>{
        if(parameter === 'Title'){
            setMovies(movies => {
                const sortedMovies =  movies?.sort((a,b) => a.original_title.localeCompare(b.original_title))
                setMovies(sortedMovies)
            })
        }
        else if(parameter === 'Release Date'){
            setMovies(movies => {
                const sortedMovies =  movies?.sort((a,b) => a.release_date.localeCompare(b.release_date))
                setMovies(sortedMovies)
            })
        }
        else if(parameter === 'Rating'){
            console.log(`trying to sort by rating`)
            setMovies(movies => {
                const sortedMovies = movies.sort((a,b) => parseFloat(a.vote_average) - parseFloat(b.vote_average))
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



    const headers = ['Title','Release Date','Rating','Genre']
  return (
    <div className='movies-container '>
        <div className='headers-container'>
        {headers.map(header => <Cell onClick = {() => sortBy(header)} style ={{fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer'}}>{header}</Cell>)}
        </div>
        {!filtering.filtering && movies?.map(movie => {
            return <div className='cell-container movie-cell-container'>
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

        {filtering.filtering &&filtering.filteringBy === 'Genre'&&movies?.map(movie => {
        const genreName = genres.find(genre => genre.id === movie.genre_ids[0])
        if(genreName.name === filtering.payload){
            // return movie.original_title
            return <div className='cell-container movie-cell-container'>
                <Cell>{movie.original_title}</Cell> 
                <Cell>{movie.release_date}</Cell>
                <Cell>{movie.vote_average}</Cell>
                <Cell>{genreName.name}</Cell>
            </div>
        }
         })}


         {filtering.filtering && filtering.filteringBy === 'Year' && filteredMoviesByYear}
    </div>
  )
}

export default Movies