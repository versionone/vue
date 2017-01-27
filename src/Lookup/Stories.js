import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Lookup from './';
import * as Filters from './Filters';

const basicDataSource = [
    'Billy',
    'Andre',
    'Chris',
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
        `Basic AutoComplete with an array of strings for its data source.`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultsHeader="Results"
                />
                <Lookup
                    dataSource={basicDataSource}
                    resultsHeader="Results"
                    selectedItems={[1]}
                />
            </div>
        )
    )
    .addWithInfo('complex data source',
        `Basic AutoComplete with an array of objects for its data source.`,
        () => (
            <div>
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    resultsHeader="Results"
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                    resultsHeader="Results"
                    selectedItems={['oid:1']}
                />
            </div>
        )
    )
    .addWithInfo('filtering',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    filter={Filters.caseInsensitive}
                    resultsHeader="Results"
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    filter={(searchText, value) => Filters.caseInsensitive(searchText, value.name)}
                    resultsHeader="Results"
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    filter={(searchText, value) => Filters.caseInsensitive(searchText, value.title)}
                    resultsHeader="Results"
                />
            </div>
        ))
    .addWithInfo('explicitly set values',
        `Set the auto complete to be initially rendered as open, with a search text, or selected value`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultsHeader="Results"
                    selectedItems={[1]}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                    resultsHeader="Results"
                    selectedItems={['oid:1']}
                />
                <Lookup
                    dataSource={basicDataSource}
                    open
                    resultsHeader="Results"
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
