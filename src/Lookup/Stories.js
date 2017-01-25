import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Lookup from './';

const basicDataSource = [
    'Result 1',
    'Result 2',
    'Result 3',
    'Result 4',
    'Result 5',
];

storiesOf('Lookup')
    .addWithInfo('basic',
        `Basic AutoComplete`,
        () => (
            <Lookup
                dataSource={basicDataSource}
                resultsHeader="Results"
            />
        )
    )
    .addWithInfo('opened',
        `Set the auto complete to be initially rendered as open`,
        () => (
            <Lookup
                dataSource={basicDataSource}
                open
                resultsHeader="Results"
            />
        )
    )
    .addWithInfo('hint text',
        `AutoComplete with hint text`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text"
                    resultsHeader="Results"
                />
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text that is so long, it will surely wrap, but do not neglect its importance...the longer it is, the more important it must be, right?"
                    resultsHeader="Results"
                />
            </div>
        )
    )
    .addWithInfo('widths',
        `AutoComplete with defined width and full width props`,
        () => (
            <div style={{
                width: '500px',
            }}>
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text"
                    resultsHeader="Results"
                    width={250}
                />
                <Lookup
                    dataSource={basicDataSource}
                    fullWidth
                    hintText="hint text"
                    resultsHeader="Results"
                />
            </div>
        )
    );
