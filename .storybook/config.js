import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import ThemeProvider from './../src/styles/ThemeProvider';
import React from 'react';

setAddon(infoAddon);
addDecorator((story) => (
   <ThemeProvider>
       {story()}
   </ThemeProvider>
));

const req = require.context('./../', true, /Stories\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
