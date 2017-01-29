import React from 'react';
import {storiesOf} from '@kadira/storybook';
import List, {ListItem} from './../List';
import SubHeader from './';

storiesOf('SubHeader')
    .addWithInfo('basic',
        `Lists with hover colors, items, and subheaders`,
        () => (
            <SubHeader>Basic</SubHeader>
        )
    )
    .addWithInfo('inside a List',
        ``,
        () => (
            <List
                hoverColor="white"
                hoverBackgroundColor="black"
            >
                <SubHeader>Quicklist</SubHeader>
                <ListItem
                    itemOid="Item 1"
                    item="Item 1"
                >
                    Item 1
                </ListItem>
                <SubHeader>Another sub header text</SubHeader>
                <ListItem
                    itemOid="Item 2"
                    item="Item 2"
                >
                    Item 2
                </ListItem>
                <SubHeader>Teammates</SubHeader>
                <ListItem
                    itemOid="Item 3"
                    item="Item 3"
                >
                    Item 3
                </ListItem>
            </List>
        )
    );
