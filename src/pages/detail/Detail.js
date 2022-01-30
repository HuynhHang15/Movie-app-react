import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router';
import CastList from './CastList';
import Trailer from './Trailer';
import MovieList from '../../component/MovieList';

function Detail() {
  const { id} =  useParams();
  const [item, setItem] = useState({});
  const [activeTrailer, setActiveTrailer] = useState(false);
  const trailerRef = useRef(null);

  const APIKEY = '1cc28d7cb8202fa7566afa90c4a8b9f4';
  const baseURL = 'https://api.themoviedb.org/3/';

  useEffect(() => {
    fetchItem();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  },[id]);

  const fetchItem = async () => {
    const url =`${baseURL}movie/${id}?api_key=${APIKEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setItem(data);
  }

  const time = (t) => {
    const h = Math.floor(t / 60);
    const m = t - h*60;
    return `${h}h ${m}m`;
  }

  useEffect(() => {
    if (activeTrailer && trailerRef.current){
      trailerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
      setActiveTrailer(false);
    }
  },[activeTrailer]);

  return (
    <>
      {item.id && (
        <>
          <div className='detail background' style={{backgroundImage: `url("http://image.tmdb.org/t/p/w500/${item.backdrop_path}")`}}>
            <div className='container'>
              <div className='detail-info'>
                <div className='detail-image'>
                  <img src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}/>
                </div>
                <div className='detail-desc'>
                  <h2>{item.original_title}</h2>

                  <div className='detail-genres'>
                    <ul className='detail-date-time'>
                      <li className='detail-date'>{item.release_date}</li>
                      <li className='detail-time'>{time(item.runtime)}</li>
                    </ul>
                    <div className='detail-list-genres'>
                      {item.genres && item.genres.slice(0,5).map((genre, index) => (
                        <span key={index} className='genres-item'>{genre.name}</span>
                      ))}
                    </div>
                  </div>

                  <div className='detail-overview'>
                    <h3>Overview</h3>
                    <p>{item.overview}</p>
                  </div>

                  <button onClick={() => setActiveTrailer(true)} className='btn btn-trailer'>Watch Trailer</button>

                  <div className='detail-cast'>
                    <h3>Casts</h3>
                    <CastList id={item.id}/>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <Trailer innerRef={trailerRef} id={item.id}/>

          <div className='container'>
            <h3>Similar</h3>
            <MovieList id={item.id} type={"similar"}/>
          </div>
        </>
      )}
    </>
    
  );
}

export default Detail;
