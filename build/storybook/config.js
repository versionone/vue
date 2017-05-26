import React from 'react';
import addStoriesGroup from 'react-storybook-addon-add-stories-group';
import infoAddon from '@kadira/react-storybook-addon-info';
import {configure, setAddon, addDecorator} from '@kadira/storybook';
import ThemeProvider from './../../packages/ThemeProvider/src/index';
import v1Theme from './../../packages/themes/src/V1Theme';
import './index.css';

setAddon(infoAddon);
setAddon(addStoriesGroup);

addDecorator((story) => (
    <div
        style={{
            marginTop: '30px',
        }}
    >
        <ThemeProvider
            theme={v1Theme}
        >
            {story()}
        </ThemeProvider>
    </div>
));

const req = require.context('./../../packages', true, /stories\/.*\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
