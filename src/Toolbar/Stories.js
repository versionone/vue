import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, ToolbarSpacer} from './';

storiesOf('Toolbar', module)
    .add('with no children', () => (
        <Toolbar title="App Toolbar" />
    ))
    .add('with title', () => (
        <Toolbar>
            <ToolbarTitle text="App Toolbar" />
        </Toolbar>
    ))
    .add('with groups and spacers', () => (
        <Toolbar>
            <ToolbarGroup>
                <button>View A</button>
                <button>View B</button>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
                <button>View C</button>
            </ToolbarGroup>
            <ToolbarSpacer />
            <ToolbarGroup>
                <ToolbarTitle text="Group 2" />
                <button>View D</button>
                <button>View E</button>
                <ToolbarSeparator />
                <button>View F</button>
                <button>View G</button>
            </ToolbarGroup>
        </Toolbar>
    ));