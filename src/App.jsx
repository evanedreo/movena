import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json", //api will send back a json object
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(()=>setDebouncedSearchTerm(searchTerm), 500,[searchTerm])

  //if fetch something, good to use try and catch so we have safety net
  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query 
      // encodeURIComponent is to make sure the UTF* encoding
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.response == "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // whenever it changes, this function will be recalled and fetch movies will be updated

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">ALl Movies</h2>

          {/* open up a ternary operator */}
          {/* ? itu if isLoading */}          {/*  : itu lanjutan, if errorMessage */}
          {isLoading ? (
            <Spinner/>
          ) :errorMessage? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/* if we have an array, we use map */}

              {/* use parentheses we don't have to add return() instead of {} */}
              {/* whenever we map over a list of elements, dont forget to provide a key to the list of elements that we are mapping over */}
              {/* key must be unique and it is usually an id, because react might be confused of some elements together */}
              {movieList.map((movie)=>(
                  // <p key={movie.id} className="text-white">{movie.title}</p>
                  <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
        }
        </section>
      </div>
    </main>
  );
};

export default App;
