import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';

function HeroSlide() {
    const [movieItems, setMovieItems] = useState([]);

    const fetchMovies = async () => {
        let url = 'https://api.themoviedb.org/3/discover/movie?api_key=1cc28d7cb8202fa7566afa90c4a8b9f4'
        const res = await fetch(url);
        const data = await res.json();
        setMovieItems(data.results.slice(0,3)); 
    }
    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 5000}}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({isActive}) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ""}`}/>
                        )}
                    </SwiperSlide>
                    
                ))}
                
            </Swiper>
        </div>
    );
}

function HeroSlideItem({item}){
    const link = `/movie/${item.id}`
    return (
        <div className='slide-item' style={{backgroundImage: `url("http://image.tmdb.org/t/p/original/${item.backdrop_path}")`}}>
            <div className='container item-details'>
                <h2 className='item-title'>{item.original_title}</h2>
                <div className='item-desc'>
                    <div className="item-vote">
                        <i className='bx bxs-star'></i>
                        {item.vote_average}
                    </div>
                    <div className='item-date'>
                         {item.release_date}
                    </div>
                </div>
                <Link className='text-link' to={link}>
                    <button className='btn btn-trailer'>Watch Trailer</button>
                </Link>
            </div>
        </div>
    );
}

export default HeroSlide;
