import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import Lookup from './';
import * as Filters from './Filters';

const basicDataSource = [
    'Billy',
    'Tammy',
    'Andre',
    'Chris',
    'Tommy',
];
const complexDataSourceConfig = {
    oidKey: 'oid',
    renderItem: (item) => `${item.name} - ${item.title}`,
    text: 'name',
};
const complexDataSourceConfigWithCustomTextRender = {
    oidKey: 'oid',
    renderItem: (item) => `${item.name} - ${item.title}`,
    text: (item) => `${item.title}: ${item.name}`,
};
const complexDataSource = [
    {
        name: 'Billy',
        oid: 'oid:1',
        title: 'Project Admin'
    }, {
        name: 'Andre',
        oid: 'oid:2',
        title: 'Developer'
    },
    {
        name: 'Chris',
        oid: 'oid:3',
        title: 'Project Lead'
    },
];

storiesOf('Lookup')
    .addWithInfo('basic',
        `Basic Lookup with an array of strings for its data source.`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultGroups="All Results"
                    onSelect={action('selected')}
                />
            </div>
        )
    )
    .addWithInfo('complex data source',
        `Basic Lookup with an array of objects for its data source.`,
        () => (
            <div>
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    resultGroups="All Results"
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                    resultGroups="All Results"
                    onSelect={action('selected')}
                />
            </div>
        )
    )
    .addWithInfo('basic filtering',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultGroups="All Results"
                    searchFilter={Filters.caseInsensitive}
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    resultGroups="All Results"
                    searchFilter={(searchText, value) => Filters.caseInsensitive(searchText, value.name)}
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    resultGroups="All Results"
                    searchFilter={(searchText, value) => Filters.caseInsensitive(searchText, value.title)}
                    onSelect={action('selected')}
                />
            </div>
        ))
    .addWithInfo('filtering and groups',
        `Grouping results with a filter`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultGroups={[
                        {
                            header: 'SubSet Results',
                            filter: (value, index) => index === 1,
                        },
                        {
                            header: 'Rest of the Results',
                            filter: (value, index) => index !== 1,
                        },
                    ]}
                    searchFilter={Filters.caseInsensitive}
                    onSelect={action('selected')}
                />
            </div>
        )
    )
    .addWithInfo('explicitly set values',
        `Set the auto complete to be initially rendered as open, with a search text, or selected value`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultGroups="Results"
                    selectedItems={[1]}
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                    resultGroups="Results"
                    selectedItems={['oid:1']}
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={basicDataSource}
                    open
                    resultGroups="Results"
                    onSelect={action('selected')}
                />
            </div>
        )
    )
    .addWithInfo('hint text',
        `AutoComplete with hint text`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text"
                    resultGroups="Results"
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text that is so long, it will surely wrap, but do not neglect its importance...the longer it is, the more important it must be, right?"
                    resultGroups="Results"
                    onSelect={action('selected')}
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
                    resultGroups="Results"
                    width={250}
                    onSelect={action('selected')}
                />
                <Lookup
                    dataSource={basicDataSource}
                    fullWidth
                    hintText="hint text"
                    resultGroups="Results"
                    onSelect={action('selected')}
                />
            </div>
        )
    );
