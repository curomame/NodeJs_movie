import React, { useEffect, useState } from 'react'
import './Favorite.css'
import Axios from 'axios';
import { Popover } from 'antd';
import {IMAGE_BASE_URL} from '../../Config'
function FavoritePage() {

  const [Favorites, setFavorites] = useState([])


  useEffect(() => {
    
    fetchFavoredMovie()

    return () => {
      
    }
  }, [])
  
  const fetchFavoredMovie = () => {

    Axios.post('/api/favorite/getFavoredMovie',{userFrom:localStorage.getItem('userId')})
        .then(res => {
      if(res.data.success){
        setFavorites(res.data.favorites)
  
      } else {
        alert('영화 정보를 가져오는데 실패 했습니다.')
      }
    })


  }

  const renderCards = Favorites.map((favorite, index) => {


    const content = (
      <div>
        {favorite.moviePost ? 
        <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : ""
        }
      </div>
    )

    return <tr key={index}>
      <Popover content={content} title={`${favorite.movieTitle}`}>
      <td>{favorite.movieTitle}</td>
      </Popover>

      <td>{favorite.movieRunTime}mins</td>
      <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
    </tr>

  })
  


  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom
    }

    Axios.post('/api/favorite/removeFromFavorite',variables)
    .then(res => {
      if(res.data.success){
        fetchFavoredMovie()
      } else {
        alert('데이터 지우기 실패')
      }
    })

  }

  return (
    <div style={{ width: '85%', margin:'3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>

        <tbody>
          {renderCards}
        </tbody>
        
      </table>
    </div>
  )
}

export default FavoritePage