import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import Chip from './';

storiesOf('Chip')
    .addWithInfo('defaults',
        ``,
        () => (
            <Chip
                text="Hello world"
                onRequestRemove={action('request removal')}
            />
        )
    )
    .addWithInfo('full width',
        ``,
        () => (
            <Chip
                fullWidth
                text="Hello world"
                onRequestRemove={action('request removal')}
            />
        )
    )
    .addWithInfo('width of 350px',
        ``,
        () => (
            <Chip
                text="Hello world"
                width={350}
                onRequestRemove={action('request removal')}
            />

        )
    );
