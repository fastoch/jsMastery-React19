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
  const [movies, setMovies] = useState([]); // an array to store the movies fetched from the API
  
  const [isLoading, setIsLoading] = useState(false); // a boolean to track if the movies are being fetched
  // we'll use the above state to conditionnally render a loading indicator

  const fetchMovies = async () => {
    // set the loading state to true so the loading indicator is displayed as soon as the function is called
    setIsLoading(true); 

    try { 
      // endpoint for fetching movies and sorting them by popularity (descending)
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  
      // calling the endpoint with the API options
      const response = await fetch(endpoint, API_OPTIONS);
      // parsing the response into a json object
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json(); // if successful response, parse the data
      console.log(data); // just to see what we get from the API (over 48000 pages and almost a million movies)

      // if we get no response, set the error message, and set the movies state to an empty array
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovies([]);
        return; // exit out of the function
      }

      // if we get a response, set the movies state with the fetched data
      setMovies(data.results || []);

      /*
      The empty array in `setMovies(data.results || [])` ensures that the `movies` state is always set to a valid array,  
      even if the API response does not include the expected `results` property or if it is `null` or `undefined`.
      */

    } catch (error) {
      console.error(`Error while fetching movies: ${error}`);
      setErrorMessage('An error occurred while fetching movies. Please try again later.');

    } finally {
      // set the loading state to false after the fetch is complete (whether successful or not)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(); // calling the fetchMovies function when the App starts
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

          {/*
          Quick note about using parentheses with the ternary operator:
          parentheses are not strictly required for single-line expressions,  
          but are essential for multi-line JSX to ensure proper parsing and readability.
          */}

          {isLoading ? (
            <p className='text-white'>Loading...</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => {

              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App