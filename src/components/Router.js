import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// components
import Home from './Home';
import Profile from './Profile';

// React router for this app
// Consists of two routes: the home page where the main search bar and other info are
// and the profile page where summoner info and champion masteries are displayed
// along with a search bar at the top
// The home page links to the profile page through search button and the profile
// page will have a button to return to the home page
// Each profile page has a unique 'sid' in the format:
// {region code}-{summoner name}
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/summoner/:sid" component={Profile} exact />
        </Switch>
    </BrowserRouter>
);

export default Router;
