import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import ThemeProvider from './../../packages/ThemeProvider/src/index';
import v1Theme from './../../packages/themes/src/V1Theme';
// import './index.css';

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
