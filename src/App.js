import React, { useState, useEffect, useCallback, useMemo } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';
import useHttp from './hooks/use-http';

function App() {
  const [movies, setMovies] = useState([]);
  const {isLoading, error, sendRequest: fetchMovies} = useHttp();
  const fetchRequestConfig = useMemo(() => { return { url: 'https://react-http-7bb32-default-rtdb.firebaseio.com/movies.json' } }, []);

  const transfromMoviesData = useCallback((data) => {
    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate
      });
    }
    setMovies(loadedMovies);
  }, [])

  useEffect(() => {
    fetchMovies(fetchRequestConfig, transfromMoviesData);
  }, [fetchRequestConfig, fetchMovies, transfromMoviesData]);

  const addMovieHandler = (movie) => setMovies(prevState => prevState.concat(movie));

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  console.log(movies);
  console.log("============movies =============");
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies.bind(null, fetchRequestConfig, transfromMoviesData)}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
