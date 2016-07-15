import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, ToolbarSpacer, ToolbarItem} from './';

storiesOf('Toolbar')
    .addWithInfo('simple usage',
        `This is a basic usage of a toolbar with no children`,
        () => (
            <Toolbar />
        )
    )
    .addWithInfo('advanced usage',
        `This is the advanced usage of the toolbar with providing a toolbar title, multiple toolbar groups with toolbar items and other components, toolbar separators, and a finally toolbar spacer.`,
        () => (
            <Toolbar>
                <ToolbarTitle text="App Toolbar" />
                <ToolbarGroup>
                    <ToolbarItem label="Options">
                        <input type="text" />
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
                <ToolbarItem>
                    <input type="text" />
                </ToolbarItem>
            </Toolbar>
        ),
    );