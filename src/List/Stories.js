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
    .addWithInfo('basic list',
        ``,
        () => (
            <List
                highlightColor="pink"
                highlightBackgroundColor="blue"
                onSelectItem={action('selected item')}
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{(index + 1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{index + 5}
                    </ListItem>
                ))}
            </List>
        )
    ).addWithInfo('with event listeners',
        ``,
        () => (
            <List
                highlightColor="pink"
                highlightBackgroundColor="blue"
                onItemHighlighted={action('highlighted')}
                onMouseEnter={action('mouse entered list')}
                onMouseLeave={action('mouse left list')}
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{(index + 1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{index + 5}
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
                onItemHighlighted={action('highlighted')}
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{(index + 1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{index + 5}
                    </ListItem>
                ))}
            </List>
        )
    )
    .addWithInfo('set highlighted item',
        ``,
        () => (
            <List
                highlightColor="pink"
                highlightBackgroundColor="blue"
                highlightedIndex={2}
                maxHeight={225}
                onItemHighlighted={action('highlighted')}
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{(index + 1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{index + 5}
                    </ListItem>
                ))}
            </List>
        )
    )
    .addWithInfo('keyboard navigation enabled',
        ``,
        () => (
            <List
                active={true}
                highlightColor="pink"
                highlightBackgroundColor="blue"
                highlightedIndex={2}
                maxHeight={225}
                onItemHighlighted={action('highlighted')}
                onSelectItem={action('selected item')}
            >
                <SubHeader>Sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{(index + 1)}
                    </ListItem>
                ))}
                <SubHeader>Another sub header text</SubHeader>
                {listItems.map((item, index) => (
                    <ListItem
                        key={index}
                    >
                        {item}{index + 5}
                    </ListItem>
                ))}
            </List>
        )
    );
