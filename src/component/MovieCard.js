import {Link} from 'react-router-dom'

function MovieCard({movie}) {
    const IMAGE_PATH = "http://image.tmdb.org/t/p/w500"
    const link = `/movie/${movie.id}`
    

    return (
        <Link className='text-link' to={link}>
            <div className="movie-card">
                {movie.poster_path ? <img className="movie-card-img" src={`${IMAGE_PATH}${movie.poster_path}`}/> : null}
                <div className="movie-card-vote">
                    <i className='bx bxs-star'></i>
                    {movie.vote_average}
                </div>
                <h5 className="movie-card-title"><span>{movie.title}</span></h5>
            </div>
        </Link>
    )
}

export default MovieCard;
