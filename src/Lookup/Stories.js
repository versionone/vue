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
    .addWithInfo('data source is array of strings',
        ``,
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
    .addWithInfo('data source is array objects',
        ``,
        () => (
            <Lookup
                dataSource={complexDataSource}
                dataSourceConfig={complexDataSourceConfig}
                resultGroups="All Results"
                onSelect={action('selected')}
            />
        )
    )
    .addWithInfo('can explicitly set selection',
        ``,
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
                    selectedItems={['oid:2']}
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
        ``,
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
        ``,
        () => (
            <div style={{
                backgroundColor: 'white',
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
    )
    .addWithInfo('custom rendering of result/selected items',
        ``,
        () => (
            <Lookup
                dataSource={complexDataSource}
                dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                resultGroups="All Results"
                onSelect={action('selected')}
            />
        )
    )
    .addWithInfo('case insensitive filtering on name',
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
            </div>
        ))
    .addWithInfo('result list groupings',
        ``,
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
                    onSelect={action('selected')}
                />
            </div>
        )
    )
    .addWithInfo('result list groupings and filtering',
        ``,
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
    .addWithInfo('multi-value',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text"
                    multiValue
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
    .addWithInfo('many selected',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text"
                    multiValue
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
                    selectedItems={[0,1,4]}
                    onSelect={action('selected')}
                />
            </div>
        )
    )
    .addWithInfo('many selected, long hint text',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text that is so long, it will surely wrap, but do not neglect its importance...the longer it is, the more important it must be, right?"
                    multiValue
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
                    selectedItems={[0,1,4]}
                    onSelect={action('selected')}
                />
            </div>
        )
    );
