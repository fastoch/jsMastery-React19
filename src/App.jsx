import React from 'react'
import Search from './components/Search'
import { useState, useEffect } from 'react'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',  // the kind of data we accept from the API
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async () => {
    try { 
      // endpoint for fetching movies and sorting them by popularity (descending)
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  
      // calling the endpoint with the API options
      const response = await fetch(endpoint, API_OPTIONS);
    } catch (error) {
      console.error(`Error while fetching movies: ${error}`);
      setErrorMessage('An error occurred while fetching movies. Please try again later.');
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className='all-movies'>
          <h2>All Movies</h2>
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}

export default App