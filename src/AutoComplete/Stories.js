import React from 'react';
import {storiesOf} from '@kadira/storybook';
import AutoComplete from './';
const basicDataSource = [
    'Result 1',
    'Result 2',
    'Result 3',
    'Result 4',
    'Result 5',
];

storiesOf('AutoComplete')
    .addWithInfo('basic',
        `Basic AutoComplete with results header`,
        () => (
            <AutoComplete
                resultsHeader="Results"
                dataSource={basicDataSource}
            />
        )
    )
    .addWithInfo('opened',
        `Set the auto complete to be initially rendered as open`,
        () => (
            <AutoComplete
                dataSource={basicDataSource}
                open
                resultsHeader="Results"
            />
        )
    );
