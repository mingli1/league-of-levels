import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// components
import Search from './Search';
import Profile from './Profile';

// React router for this app
// Consists of two routes: the home page where the main search bar and other info are
// and the profile page where summoner info and champion masteries are displayed
// along with a search bar at the top
// The home page links to the profile page through search button and the profile
// page will have a button to return to the home page
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Search} exact />
            <Route path="/summoner/:sid" component={Profile} />
        </Switch>
    </BrowserRouter>
);

export default Router;
