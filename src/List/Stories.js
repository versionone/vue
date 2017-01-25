import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import List, {ListItem} from './';
import SubHeader from './../SubHeader';

storiesOf('List')
    .addWithInfo('lists',
        `Lists with hover colors, items, and subheaders`,
        () => (
            <div>
                <div style={{marginBottom: '1em'}}>
                    <List
                        hoverColor="white"
                        hoverBackgroundColor="black"
                    >
                        <ListItem onClick={action('clicked')}>Item 1</ListItem>
                        <ListItem onClick={action('clicked')}>Item 2</ListItem>
                        <ListItem onClick={action('clicked')}>Item 3</ListItem>
                    </List>
                </div>
                <div style={{marginBottom: '1em'}}>
                    <List
                        hoverColor="white"
                        hoverBackgroundColor="lightgray"
                    >
                        <SubHeader>Sub header text</SubHeader>
                        <ListItem onClick={action('clicked')}>Item 1</ListItem>
                        <ListItem onClick={action('clicked')}>Item 2</ListItem>
                        <ListItem onClick={action('clicked')}>Item 3</ListItem>
                        <SubHeader>Another sub header text</SubHeader>
                        <ListItem onClick={action('clicked')}>Item 4</ListItem>
                        <ListItem onClick={action('clicked')}>Item 5</ListItem>
                    </List>
                </div>
            </div>
        )
    )
    .addWithInfo('empty list',
        ``,
        () => (
            <List />
        )
    );
