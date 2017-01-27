import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Lookup from './';

const basicDataSource = {
    'oid:1': 'Result Item 1',
    'oid:2': 'Result Item 2',
    'oid:3': 'Result Item 3',
    'oid:4': 'Result Item 4',
};
const objectDataSource = {
    'oid:1': {
        name: 'Billy',
        title: 'Project Admin'
    },
    'oid:2': {
        name: 'Andre',
        title: 'Developer'
    },
    'oid:3': {
        name: 'Chris',
        title: 'Project Lead'
    },
};

storiesOf('Lookup')
    .addWithInfo('basic',
        `Basic AutoComplete`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultsHeader="Results"
                />
                <Lookup
                    dataSource={basicDataSource}
                    resultsHeader="Results"
                    selectedItems={['oid:3']}
                />
            </div>
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
    )
    .addWithInfo('custom item renderering',
        `AutoComplete with defined width and full width props`,
        () => (
            <Lookup
                dataSource={objectDataSource}
                hintText="hint text"
                resultsHeader="Results"
                getChipText={(item) => item.name}
                itemRenderer={(item) => (
                    <div>
                        <span>{item.name}</span>: <span>{item.title}</span>
                    </div>
                )}
            />
        )
    );
