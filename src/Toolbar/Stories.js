import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import Toolbar from './Toolbar';

storiesOf('Toolbar', module)
    .add('with title', () => (
        <Toolbar text="My Title" />
    ))
    .add('with no text', () => (
        <Toolbar text="My Title" />
    ));