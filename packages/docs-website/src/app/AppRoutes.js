import React from 'react';
import {Route, IndexRoute} from 'react-router';
import camelCase from 'camelcase';
import Master from './components/Master';
import ContentPage from './components/ContentPage';
import Page from './components/Page';
import ComponentPage from './components/ComponentPage';
import SearchResults from './components/SearchResults';
import Home from './components/pages/Home';
import injectPageMeta from './injectPageMeta';
import componentsMeta from './../../componentPagesMeta';
import pages from './../../pagesMeta';

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
            <Route path="page/:pageName" getComponent={(nextState, callback) => {
                const pageId = camelCase(nextState.params.pageName);
                const pageMeta = pages.find((page) => camelCase(page.title) === pageId);
                callback(null, injectPageMeta(pageMeta)(Page));
            }} />
        </Route>
    </Route>
);

export default AppRoutes;
