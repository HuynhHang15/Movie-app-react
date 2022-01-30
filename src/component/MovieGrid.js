import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function MovieGrid(props) {
    const [movies, setMovies] = useState([]);
    const [bg, setBg] = useState("");
    const {search} = useParams();

    const [loadMore, setLoadMore] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const APIKEY = '1cc28d7cb8202fa7566afa90c4a8b9f4';
    const baseURL = 'https://api.themoviedb.org/3/';
    

    const fetchMovies = async () => {
        const urlMovie = `${baseURL}movie/${props.type}?api_key=${APIKEY}`;
        const urlSearch = `${baseURL}search/movie?api_key=${APIKEY}&query=${props.input}`;
        let url = (props.type == 'search') ? urlSearch : urlMovie;
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);  
        setBg(data.results[0].backdrop_path);

        setLoadMore(true);
        setTotalPage(data.total_pages);
    }

    const showMoreItems = async () => {
        const urlMovie = `${baseURL}movie/${props.type}?api_key=${APIKEY}&page=${page+1}`;
        const urlSearch = `${baseURL}search/movie?api_key=${APIKEY}&query=${props.input}&page=${page+1}`;
        let url = (props.type == 'search') ? urlSearch : urlMovie;
        const res = await fetch(url);
        const data = await res.json();
        setMovies([...movies, ...data.results]);  
        setPage(page+1);
    }

    useEffect(() => {
        fetchMovies();
    }, [search]);
    return (
        <div >
            {bg &&
                <div className='header-bg background' style={{backgroundImage: `url("http://image.tmdb.org/t/p/w500/${bg}")` }}>
                </div>
            } 
            <div className='container'>
                <div className='movie-grid'>
                    {movies.map( (movie, i) => (
                        <MovieCard
                            key={i}
                            movie={movie}
                        />
                    ))}

                </div>
            </div>
            { page < totalPage && (<button 
                className={loadMore ? 'loadMore' : 'loadMore hide'}
                onClick={showMoreItems}
            >
                Load More
            </button>)}
        </div>
    );
}

export default MovieGrid;
