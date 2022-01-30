import React from 'react';
import HeroSlide from '../component/HeroSlide';
import MovieList from '../component/MovieList';

function Home() {
  return (
  <div>
    <HeroSlide/>
    <div className='list-section'>
      <div className='section container'>
        <MovieList type={"popular"} title={"Trending Movies"}/>

        <MovieList type={"top_rated"} title={"Top Rated Movies"}/>
      </div>
    </div>
  </div>
  );
}

export default Home;
