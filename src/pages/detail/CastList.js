import React, {useEffect, useState} from 'react';

function CastList({id}) {
    const [casts, setCasts] = useState([]);
 
    const fecthUrl = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1cc28d7cb8202fa7566afa90c4a8b9f4`
        const res = await fetch(url);
        const data = await res.json();
        setCasts(data.cast.slice(0,5));
    }

    useEffect(() => {
        fecthUrl();
    },[id])

  return (
      <div className='casts'>
          {casts.map((item, index) => (
              <div key={index} className='casts-item'>
                  {item.profile_path ? <img className='casts-item-image' src={`http://image.tmdb.org/t/p/w500/${item.profile_path}`}/> : null}
                  <div className='casts-item-name'>{item.name}</div>
              </div>
          ))}
      </div>
  );
}

export default CastList;
