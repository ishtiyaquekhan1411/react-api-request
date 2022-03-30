import React, { useRef } from 'react';
import useHttp from '../hooks/use-http';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');
  const { sendRequest: postRequest } = useHttp();

  const addMovie = (movieData, responseMovieData) => {
    const generatedId = responseMovieData.name;
    movieData.id = generatedId
    props.onAddMovie(movieData);
  }

  function submitHandler(event) {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    postRequest(
      {
        url: 'https://react-http-7bb32-default-rtdb.firebaseio.com/movies.json',
        method: 'POST',
        body: movie,
        header: { 'Content-Type': 'application/json' }  
      },
      addMovie.bind(null, movie)
    )
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
