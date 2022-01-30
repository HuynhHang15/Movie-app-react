import React from 'react';
import {useParams} from 'react-router';
import MovieGrid from '../component/MovieGrid';
function Search() {
    const {search} = useParams();

    return (
        <div className='movie'>
            <MovieGrid type={'search'} input={search}/>
        </div>    
    );
}

export default Search;
