import React from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'  
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'

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

  // optimizing the search by limiting the number of requests to the API
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  // wait for the user to stop typing for 1 second before making the request to the API
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]); 
  // we'll need to use the debouncedSearchTerm when calling the fetchMovies function in the useEffect hook

  const fetchMovies = async (query = '') => {
    // set the loading state to true so the loading indicator is displayed as soon as the function is called
    setIsLoading(true); 

    try { 
      // endpoint for fetching movies and sorting them by popularity (descending)
      const endpoint = query ?
        // if there is a search term, use the search endpoint
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        // else, use the discover endpoint
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  
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
    fetchMovies(debouncedSearchTerm); // calling the fetchMovies function when the App starts
  }, [debouncedSearchTerm]); // calling the fetchMovies function when the searchTerm changes

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
          <h2 className='mt-[32px]'>All Movies</h2>

          {/*
          Quick note about using parentheses with the ternary operator:
          parentheses are not strictly required for single-line expressions,  
          but are essential for multi-line JSX to ensure proper parsing and readability.
          */}

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {/* 
              now we will map over the movies array and display each movie title in a paragraph
              we won't open a function block by using curly braces but we will use parentheses
              this will keep our code cleaner since we won't have to use a return statement
              the parentheses are the same as using a return statement
              */}
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App