import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import {index} from './searchIndex';
import Master from './components/Master';
import ContentPage from './components/ContentPage';
import SearchResults from './components/SearchResults';
import Home from './components/pages/Home';
import ContentWithPlayground from './components/ContentWithPlayground';
import Colors from './components/pages/foundations/V1Colors';
import Themes from './components/pages/foundations/Themes';
import Styles from './components/pages/foundations/Styles';
import * as InlineDialog from './components/pages/Patterns/InlineDialog'
import menuItems from './routes/menuItems';
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
            <Route path="search/:searchTerm" component={SearchResults} />
            {menuItems.map((rootMenuItem, i) => (
                <Route path={rootMenuItem.path} component={rootMenuItem.component} key={i}>
                    {rootMenuItem.nestedMenuItems.map((menuItem, menuItemIndex) => (
                        <Route path={menuItem.path} component={index(`${rootMenuItem.path}/${menuItem.path}`, menuItem.component, menuItem.meta)} key={menuItemIndex} />
                    ))}
                </Route>
            ))}
        </Route>
    </Route>
);

export default AppRoutes;
