import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import List, {ListItem} from './';
import SubHeader from './../SubHeader';

const listItems = [
    'Item ',
    'Item ',
    'Item ',
    'Item ',
]
storiesOf('List')
    .addWithInfo('lists',
        `Lists with hover colors, items, and subheaders`,
        () => (
            <List
                hoverColor="pink"
                hoverBackgroundColor="blue"
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        itemOid={item}
                        item={item}
                        key={index}
                        onClick={action(`Clicked item ${(index+1)}`)}
                        onSelect={action(`Selected item ${(index+1)}`)}
                    >
                        {item}{(index+1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        itemOid={item}
                        item={item}
                        key={index}
                        onClick={action(`Clicked item ${index+5}`)}
                        onSelect={action(`Selected item ${index+5}`)}
                    >
                        {item}{index+5}
                    </ListItem>
                ))}
            </List>
        )
    )
    .addWithInfo('empty list',
        ``,
        () => (
            <List />
        )
    )
    .addWithInfo('scrolling list',
        ``,
        () => (
            <List
                maxHeight={225}
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        itemOid={item}
                        item={item}
                        key={index}
                        onClick={action(`Clicked item ${(index+1)}`)}
                        onSelect={action(`Selected item ${(index+1)}`)}
                    >
                        {item}{(index+1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        itemOid={item}
                        item={item}
                        key={index}
                        onClick={action(`Clicked item ${index+5}`)}
                        onSelect={action(`Selected item ${index+5}`)}
                    >
                        {item}{index+5}
                    </ListItem>
                ))}
            </List>
        )
    );
