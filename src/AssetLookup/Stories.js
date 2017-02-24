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

