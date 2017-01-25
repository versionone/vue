import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Chip from './';

storiesOf('Chip')
    .addWithInfo('basic chip',
        `Basic chip`,
        () => (
            <Chip text="Hello world" />
        )
    );
