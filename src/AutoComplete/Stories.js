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
        `Basic AutoComplete`,
        () => (
            <AutoComplete
                dataSource={basicDataSource}
                hintText="hint text"
                resultsHeader="Results"
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
    )
    .addWithInfo('hint text',
        `AutoComplete with hint text`,
        () => (
            <AutoComplete
                dataSource={basicDataSource}
                hintText="hint text"
                resultsHeader="Results"
            />
        )
    )
    .addWithInfo('widths',
        `AutoComplete with defined width and full width props`,
        () => (
            <div style={{
                width: '500px',
            }}>
                <AutoComplete
                    dataSource={basicDataSource}
                    hintText="hint text"
                    resultsHeader="Results"
                    width={250}
                />
                <AutoComplete
                    dataSource={basicDataSource}
                    fullWidth
                    hintText="hint text"
                    resultsHeader="Results"
                />
            </div>
        )
    );
