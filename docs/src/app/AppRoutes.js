import React from 'react';
import {Route, IndexRoute} from 'react-router';
import camelCase from 'camelcase';
import Master from './components/Master';
import ContentPage from './components/ContentPage';
import ComponentPage from './components/ComponentPage';
import SearchResults from './components/SearchResults';
import Home from './components/pages/Home';
import menuItems from './routes/menuItems';
import injectPageMeta from './injectPageMeta';
import componentsMeta from './../../componentsMeta';

const isNotComponentMenuGroup = () => (menuItem) => menuItem.meta.title !== 'Components';

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
            <Route path="component/:componentName" getComponent={(nextState, callback) => {
                const componentId = camelCase(nextState.params.componentName);
                const componentMeta = componentsMeta[componentId];
                callback(null, injectPageMeta(componentMeta)(ComponentPage));
            }} />
            {menuItems
                .filter(isNotComponentMenuGroup())
                .map((rootMenuItem, i) => (
                    <Route path={rootMenuItem.path} key={i}>
                        {rootMenuItem.nestedMenuItems.map((menuItem, menuItemIndex) => (
                            <Route path={menuItem.path}
                                   component={menuItem.component}
                                   key={menuItemIndex} />
                        ))}
                    </Route>
                ))}
        </Route>
    </Route>
);

export default AppRoutes;
