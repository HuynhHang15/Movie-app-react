import './App.css';
import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './config/Routes';

import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route render={props => (
          <>
            <Header {...props}/>
            <Routes/>
            <Footer/>
          </>
        )}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
