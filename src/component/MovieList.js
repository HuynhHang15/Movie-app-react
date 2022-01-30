import React, {useEffect, useState} from 'react';
import {SwiperSlide, Swiper} from 'swiper/react';
import { Link } from 'react-router-dom';
import "swiper/css"
import MovieCard from './MovieCard';

function MovieList({id, type, title}) {
  const [items, setItems] = useState([]);
  const urlSimilar = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1cc28d7cb8202fa7566afa90c4a8b9f4`;
  const urlPopular = `https://api.themoviedb.org/3/movie/${type}?api_key=1cc28d7cb8202fa7566afa90c4a8b9f4`

  const fetchMovies = async () => {
      let url = (type === 'similar') ? urlSimilar : urlPopular;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.results);  
  }

  useEffect(() => {
      fetchMovies();
  }, [id]);

  return (
  <>
    <div className='movie-list'>
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        <div className='movie-list-title'>
          <h3>{title}</h3>
          {type != 'similar' && (
            <Link className='text-link' to={`/${(type=='popular') ? 'discover' : type}`}><i className='bx bx-chevron-right'></i></Link>
          )}
        </div>
        {items.map( (item,i) => (
          <SwiperSlide key = {i}>
            <MovieCard
                key={item.id}
                movie={item}
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  </>
  );
}

export default MovieList;
