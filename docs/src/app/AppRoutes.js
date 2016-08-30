import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import searchIndex from './searchIndex';
import Master from './components/Master';
import Home from './components/pages/Home';
import Colors from './components/pages/Patterns/Colors';
import Themes from './components/pages/Patterns/Themes';
import Styles from './components/pages/Patterns/Styles';
import Popover from './components/pages/components/Popover/Page';
import PopoverSearch from 'versionone-ui/Popover/package.json';


// Add component packages to search index:
searchIndex.add(PopoverSearch);


// Here we define all our material-ui ReactComponents.

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
    <Route path="/" component={Master}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Redirect from="get-started" to="/get-started/prerequisites" />
        <Redirect from="patterns" to="/patterns/themes" />
        <Route path="Patterns">
            <Route ptah="colors" component={Colors} />
            <Route path="themes" component={Themes} />
            <Route path="styles" component={Styles} />
        </Route>
        <Route path="components">
            <Route path="popover" component={Popover} />
        </Route>
    </Route>
);

export default AppRoutes;
