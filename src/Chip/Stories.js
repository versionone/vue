import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Chip from './';

storiesOf('Chip')
    .addWithInfo('basic chip',
        `Basic chip`,
        () => (
            <div>
                <Chip
                    fullWidth
                    text="Hello world"
                />
                <Chip
                    text="Hello world"
                    width={250}
                />
                <Chip text="Hello world" />
            </div>
        )
    );
