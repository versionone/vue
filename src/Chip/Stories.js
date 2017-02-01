import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import Chip from './';

storiesOf('Chip')
    .addWithInfo('basic chip',
        `Basic chip`,
        () => (
            <div>
                <Chip
                    fullWidth
                    text="Hello world"
                    onRequestRemove={action('request removal')}
                />
                <Chip
                    text="Hello world"
                    width={250}
                    onRequestRemove={action('request removal')}
                />
                <Chip
                    text="Hello world"
                    onRequestRemove={action('request removal')}
                />
            </div>
        )
    );
