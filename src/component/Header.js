import React, {useRef, useEffect, useState, useCallback} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import avatar from '../image/avatar.png'

const headerNav = [
  {
    display: 'Home',
    path: '/',
    icon: <i className='bx bxs-home'></i>
  },
  {
    display: "Discover",
    path: '/discover',
    icon: <i className='bx bx-compass'></i>
  },
  {
    display: "Top Rated",
    path: '/top_rated',
    icon: <i className='bx bx-trending-up'></i>
  },
  {
    display: "User",
    path: '/user',
    icon: <i className='bx bx-user'></i>
  }
];

function Header() {
  const {pathname} = useLocation();
  const headerRef = useRef(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [search, setSearch] = useState("");
  let history = useHistory();
  const inputRef = useRef();


  const active = headerNav.findIndex(e => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        headerRef.current.classList.add('shrink');
      }
      else{
        headerRef.current.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    }
  },[]);

  const handleSearch = () => {
    inputRef.current.focus();
    if (activeSearch == false){
      setActiveSearch(true);
    }
    else{
      setActiveSearch(false);
    }
  }

  const gotoSearch = useCallback(() => {
    if (search.length > 0){
      history.push(`/search/${search}`);
    }
  }, [history, search]);

  const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();

      gotoSearch();
  }

  return (
    <div ref={headerRef} className='header'>
      <div className='container'>
        <ul className='header-nav'>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link className='text-link' to={e.path}>
                <span className='header-icon'>{e.icon}</span>
                <span className={e.display=='User' ? 'header-name name-user' : 'header-name'}>{e.display}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className='header-right'>
          <form onSubmit={handleSubmit} className={activeSearch ? 'search active' : 'search'}>
            <input ref={inputRef} onInput={(e) => setSearch(e.target.value.trim())} type="text" placeholder='Search movie...'/>
            <i onClick={handleSearch} className='bx bx-search'></i>
          </form>
          <div className='avatar'>
            <img src={avatar} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
