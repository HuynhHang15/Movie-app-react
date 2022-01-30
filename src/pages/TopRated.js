import MovieGrid from '../component/MovieGrid';


function TopRated() {

    return (
        <div className='movie'>
            <MovieGrid type={'top_rated'}/>
        </div>
    );
}

export default TopRated;
