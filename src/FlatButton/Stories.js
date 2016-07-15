import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {FlatButton} from './';

storiesOf('FlatButton', module)
    .add('with text and no icon', () => (
        <div>
            <FlatButton text="Push Me" />
            <FlatButton text="Push Me, Too!" />
        </div>
    ));