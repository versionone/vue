import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import {index} from './searchIndex';
import Master from './components/Master';
import ContentPage from './components/pages/ContentPage';
import SearchResults from './components/pages/SearchResults';
import Home from './components/pages/Home';
import ContentWithPlayground from './components/pages/ContentWithPlayground';
import Colors from './components/pages/foundations/V1Colors';
import Themes from './components/pages/foundations/Themes';
import Styles from './components/pages/foundations/Styles';
import * as Popover from './components/pages/components/Popover/Page';
import * as Toolbar from './components/pages/components/Toolbar/Page';
import * as Tooltip from './components/pages/components/Tooltip/Page';
import * as InlineDialog from './components/pages/Patterns/InlineDialog'
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
        <Route component={ContentPage}>
            <Redirect from="get-started" to="/get-started/prerequisites" />
            <Redirect from="patterns" to="/patterns/themes" />
            <Route path="search/:searchTerm" component={SearchResults}  />
            <Route path="foundations" >
                <Route path="colors" component={Colors} />
                <Route path="themes" component={Themes} />
                <Route path="styles" component={Styles} />
            </Route>
            <Route path="patterns" component={ContentWithPlayground}>
                <Route path="inlineDialog" component={index('patterns/inlineDialog', InlineDialog)} />
            </Route>
            <Route path="components" component={ContentWithPlayground}>
                <Route path="popover" component={index('components/popover', Popover)} />
                <Route path="toolbar" component={index('components/toolbar', Toolbar)} />
                <Route path="tooltip" component={index('components/tooltip', Tooltip)} />
            </Route>
        </Route>
    </Route>
);

export default AppRoutes;
