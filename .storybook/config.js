import {configure, setAddon, addDecorator} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import addStoriesGroup from 'react-storybook-addon-add-stories-group';
import ThemeProvider from './../src/styles/ThemeProvider';
import React from 'react';
import './index.css';

setAddon(infoAddon);
setAddon(addStoriesGroup);
addDecorator((story) => (
    <div style={{marginTop: '30px'}}>
        <ThemeProvider>
            {story()}
        </ThemeProvider>
    </div>
));

const req = require.context('./../', true, /Stories\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
