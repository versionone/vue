import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, ToolbarSpacer, ToolbarItem} from './';

storiesOf('Toolbar', module)
    .add('with no children', () => (
        <Toolbar title="App Toolbar" />
    ))
    .add('with title', () => (
        <Toolbar>
            <ToolbarTitle text="App Toolbar" />
        </Toolbar>
    ))
    .add('with title, groups, items, separators and spacers', () => (
        <Toolbar>
            <ToolbarTitle text="App Toolbar" />
            <ToolbarGroup>
                <ToolbarItem label="Options">
                    <select>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                </ToolbarItem>
                <button>View B</button>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
                <button>View C</button>
            </ToolbarGroup>
            <ToolbarSpacer />
            <ToolbarGroup>
                <button>View D</button>
                <button>View E</button>
                <ToolbarSeparator />
                <button>View F</button>
                <button>View G</button>
            </ToolbarGroup>
        </Toolbar>
    ));