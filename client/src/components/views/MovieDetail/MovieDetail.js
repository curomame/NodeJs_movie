import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/MainImage';
import MovieInfo from './Section/MovieInfo';

function MovieDetail(props) {

  let movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);


  useEffect(() => {

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;


    fetch(endpointInfo)
      .then(res => res.json())
      .then(res => 
        {
          setMovie(res);
        })
      }
      
      ,[])

  return (
    <div>


        <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
        />


      <div style={{ width : '85%', margin:'1rem auto'}}>

    <MovieInfo
    
      movie={Movie}
    />

      <br/>

      <div style={{display:'flex', justifyContnet:'center', margin:'2rem'}}>
        <button>Toggle Actor View</button>
      </div>

      </div>
    </div>
  )
}

export default MovieDetail