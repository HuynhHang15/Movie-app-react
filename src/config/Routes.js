import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Discover from '../pages/Discover';
import TopRated from '../pages/TopRated';
import Detail from '../pages/detail/Detail';
import Search from '../pages/Search';
import User from '../pages/User';

function Routes() {
  return (
      <Switch>
        <Route
            path='/' exact component={Home}
        />
        <Route
            path='/discover' exact component={Discover}
        />
        <Route
            path='/top_rated' exact component={TopRated}
        />
        <Route
            path='/user' exact component={User}
        />
        <Route
            path='/movie/:id' exact component={Detail}
        />
        <Route
            path='/search/:search' exact component={Search}
        />
      </Switch>
  );
}

export default Routes;
