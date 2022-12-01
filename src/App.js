import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

// API KEY =  c8626d5d

const API_URL =  'http://www.omdbapi.com/?i=tt3896198&apikey=c8626d5d';

const App = () => {
    const [movies, setMovies ] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Search for movie using OMDB API, store in movies array
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search);
    }

    // Starting search when page loads
    useEffect(() => {
        searchMovies('batman');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLookup</h1>

            {/* Search bar. Call searchMovies function with term typed in search bar
             when search icon clicked */}
            <div className='search'>
                <input
                    placeholder='Search for a movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='searchbar'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {/* Go through each movie and load card from moviecard componenet
            If movies array is empty, state no movies found*/}
            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2> No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;