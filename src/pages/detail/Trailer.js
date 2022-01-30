import React, {useEffect, useState, useRef} from 'react';

function Trailer({id, innerRef}) {
    const [trailer, setTrailer] = useState("");
    const iframeRef = useRef(null);
    
    const fecthUrl = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1cc28d7cb8202fa7566afa90c4a8b9f4`
        const res = await fetch(url);
        const data = await res.json();
        let video;

        if (data.results){
            data.results.map(item => {
                if (item.name && item.name == 'Official Trailer'){
                    video = item;
                }
            });
            setTrailer( video ? video : data.results[0]) ;
        }
    }

    useEffect(() => {
        fecthUrl();
    },[id]);

    useEffect(() => {
            const height = iframeRef.current.offsetWidth * 9/16 + 'px';
            iframeRef.current.setAttribute('height', height);
    },[])

  return (
    <div>
        <div className='trailer' ref={innerRef}>
            <div className='container' >
                <h3 className='trailer-title'>{trailer.name}</h3>
                <iframe
                    className='trailer-video'
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    width= "100%"
                    title= "video"
                    ref={iframeRef}
                >
                </iframe>
            </div>
        </div>
        
    </div>
  );
}

export default Trailer;
