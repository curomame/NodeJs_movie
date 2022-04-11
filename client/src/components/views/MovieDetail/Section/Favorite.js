import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

  const movieId = props.movieIdconst 
  const userFrom = props.userFrom
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRunTime = props.movieInfo.runtime

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  }

  useEffect(() => {
    

      Axios.post('/api/favorite/favoriteNumber', variables)
      .then(res => {  
        if(res.data.success){
          setFavoriteNumber(res.data.favoriteNumber);
        } else {
          alert('숫자 정보를 가져오는데 실패 했습니다.')
        }
      })

      Axios.post('/api/favorite/favorited', variables)
      .then(res => {
        setFavorited(res.data.Favorited);
        if(res.data.success){
        } else {
          alert('정보를 가져오는데 실패했습니다.')
        }
      })

  },[])
  
  const onClickFavorite = () => {
    if(Favorited){
      Axios.post('/api/favorite/removeFromFavorite',variables)
      .then(res => {
        if(res.data.success){
          setFavoriteNumber(FavoriteNumber - 1)
          setFavorited(!Favorited)
        } else {
          alert('Faborite 리스트에서 지우는 것을 실패하였습니다.')
        }
      })
    } else {
      Axios.post('/api/favorite/addToFavorite',variables)
      .then(res => {
        if(res.data.success){
          setFavoriteNumber(FavoriteNumber + 1)
          setFavorited(!Favorited)
        } else {
          alert('Faborite 리스트에서 추가하는 것을 실패하였습니다.')
        }
      })
    }
  }

  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite":"Add to Favorite"}{FavoriteNumber}</Button>

    </div>
  )
}

export default Favorite