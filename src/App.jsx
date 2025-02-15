import React from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'  
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'

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
  const [trendingMovies, setTrendingMovies] = useState([]); // trending movies fetched from appwrite
  
  const [isLoading, setIsLoading] = useState(false); // a boolean to track if the movies are being fetched
  // we'll use the above state to conditionnally render a loading indicator

  // optimizing the search by limiting the number of requests to the API
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  // wait for the user to stop typing for 1 second before making the request to the API
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]); 
  // we'll need to pass debouncedSearchTerm when calling the fetchMovies function in the useEffect hook

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

      // if the search bar is not empty, update the search count in the appwrite database
      if (query && data.results.length > 0) {  // the "> 0" is not necessary, it's just for clarity
        await updateSearchCount(query, data.results[0]);
      }
      // the updateSearchCount() function is defined in appwrite.js, hence the import at the top
      // it will feed our appwrite collection with a new record for each search term
      // this new record will include the search term, the number of times it's been entered (count), the movie ID, and the poster URL

    } catch (error) {
      console.error(`Error while fetching movies: ${error}`);
      setErrorMessage('An error occurred while fetching movies. Please try again later.');

    } finally {
      // set the loading state to false after the fetch is complete (whether successful or not)
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setTrendingMovies(trendingMovies);
    } catch (error) {
      console.error(`Error while fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm); 
  }, [debouncedSearchTerm]); // calling the fetchMovies function every time the searchTerm changes

  useEffect(() => {
    loadTrendingMovies();
  }, []); // calling the loadTrendingMovies function only once, when the app loads

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
        {/* The `&&` operator in JavaScript checks if the left-hand side is truthy.  
            If trendingMovies exists, we'll display the trending movies section. */}
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.movie_id}> {/* using the movie_id from our appwrite collection */}
                  <p>{index + 1}</p>     
                  <img src={movie.poster_url} />   
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 className='mt-[32px]'>All movies returned by your search</h2>

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
              using parentheses is the same as using a return statement
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