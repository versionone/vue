import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import List, {ListItem} from './';
import SubHeader from './../SubHeader';

storiesOf('List')
    .addWithInfo('lists',
        `Lists with hover colors, items, and subheaders`,
        () => (
            <List
                hoverColor="white"
                hoverBackgroundColor="black"
            >
                <SubHeader>Sub header text</SubHeader>
                <ListItem
                    item="Item 1"
                    onClick={action('clicked')}
                    onSelect={action('selected item')}
                >
                    Item 1
                </ListItem>
                <SubHeader>Another sub header text</SubHeader>
                <ListItem
                    item="Item 2"
                    onClick={action('clicked')}
                    onSelect={action('selected item 2')}
                >
                    Item 2
                </ListItem>
                <ListItem
                    item="Item 2"
                    onClick={action('clicked')}
                    onSelect={action('selected item 3')}
                >
                    Item 2
                </ListItem>
            </List>
        )
    )
    .addWithInfo('empty list',
        ``,
        () => (
            <List />
        )
    );
