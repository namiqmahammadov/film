import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NA from '../images/NA.png';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blueviolet",
};

const FilmDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = () => {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=6be6c7a0`)
        .then(res => res.json())
        .then(data => {
          setMovie(data);
          setLoading(false);
        })
        .catch(error => console.error('Error fetching movie details:', error));
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className='White sweet-loading'>
        <MoonLoader
          color='blueviolet'
          loading={loading}
          css={override}
          size={30}
          marginTop={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <Card style={{ width: '18rem', margin: '15px auto' }}>
        <Card.Img variant="top" className="card-img-top" src={movie.Poster === 'N/A' ? NA : movie.Poster} alt="Title" />
        <Card.Body>
          <Card.Title className="card-title first">Title: {movie.Title}</Card.Title>
          <Card.Text>
            <p className="card-text">Director: {movie.Director}</p>
            <p className="card-text">Year: {movie.Year}</p>
            <p className="card-text x">IMDB: {movie.imdbRating}</p>
          </Card.Text>
          <Button as={Link} className='btn-primary-add detail z' to={`https://www.imdb.com/title/${id}`}>Go To Detail</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FilmDetail;
