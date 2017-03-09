import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import FilterIcon from './../Icons/FilterIcon';
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
    renderSelectedItem: 'name',
};
const complexDataSourceConfigWithCustomTextRender = {
    oidKey: 'oid',
    renderItem: (item) => `${item.name} - ${item.title}`,
    renderSelectedItem: (item) => `${item.title}: ${item.name}`,
};
const complexDataSource = [
    {
        name: 'Billy',
        oid: 'oid:1',
        title: 'Project Admin'
    },
    {
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
const standardEventHandlers = {
    onActivate: action('activated'),
    onDeactivate: action('deactivated'),
    onSelect: action('selected'),
};

storiesOf('Lookup')
    .addWithInfo('datasource is array of strings',
        `Basic Lookup with an array of strings for its data source.`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultGroups="All Results"
                    {...standardEventHandlers}
                />
            </div>
        )
    )
    .addWithInfo('data source is array objects',
        `Basic Lookup with an array of objects for its data source.`,
        () => (
            <Lookup
                dataSource={complexDataSource}
                dataSourceConfig={complexDataSourceConfig}
                resultGroups="All Results"
                {...standardEventHandlers}
            />
        )
    )
    .addWithInfo('can explicitly set selection',
        `Basic Lookup with an array of objects for its data source.`,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    resultGroups="Results"
                    selectedItems={[1]}
                    {...standardEventHandlers}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                    resultGroups="Results"
                    selectedItems={['oid:2']}
                    {...standardEventHandlers}
                />
                <Lookup
                    dataSource={basicDataSource}
                    open
                    resultGroups="Results"
                    {...standardEventHandlers}
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
                    {...standardEventHandlers}
                />
                <Lookup
                    dataSource={basicDataSource}
                    hintText="hint text that is so long, it will surely wrap, but do not neglect its importance...the longer it is, the more important it must be, right?"
                    resultGroups="Results"
                    {...standardEventHandlers}
                />
            </div>
        )
    )
    .addWithInfo('widths',
        `AutoComplete with defined width and full width props`,
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
                    {...standardEventHandlers}
                />
                <Lookup
                    dataSource={basicDataSource}
                    fullWidth
                    hintText="hint text"
                    resultGroups="Results"
                    {...standardEventHandlers}
                />
            </div>
        )
    )
    .addWithInfo('custom rendering of result/selected items',
        `Basic Lookup with an array of objects for its data source.`,
        () => (
            <Lookup
                dataSource={complexDataSource}
                dataSourceConfig={complexDataSourceConfigWithCustomTextRender}
                resultGroups="All Results"
                {...standardEventHandlers}
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
                    {...standardEventHandlers}
                />
                <Lookup
                    dataSource={complexDataSource}
                    dataSourceConfig={complexDataSourceConfig}
                    resultGroups="All Results"
                    searchFilter={(searchText, value) => Filters.caseInsensitive(searchText, value.name)}
                    {...standardEventHandlers}
                />
            </div>
        ))
    .addWithInfo('result list groupings',
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
                    {...standardEventHandlers}
                />
            </div>
        )
    )
    .addWithInfo('result list groupings and filtering',
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
                    {...standardEventHandlers}
                />
            </div>
        )
    )
    .addWithInfo('inlined; no border',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    inline
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
                    {...standardEventHandlers}
                />
                <br />
                <Lookup
                    dataSource={basicDataSource}
                    inline
                    prependIcon={FilterIcon}
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
                    {...standardEventHandlers}
                />
            </div>
        )
    )
    .addWithInfo('prepend an icon',
        ``,
        () => (
            <div>
                <Lookup
                    dataSource={basicDataSource}
                    prependIcon={FilterIcon}
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
                    {...standardEventHandlers}
                />
            </div>
        )
    );
