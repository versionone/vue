import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Toolbar from './Toolbar';
import ToolbarGroup from './ToolbarGroup';
import ToolbarGroupTitle from './ToolbarGroupTitle';

storiesOf('Toolbar', module)
    .add('with title', () => (
        <Toolbar title="App Toolbar" />
    ))
    .add('with no title', () => (
        <Toolbar />
    ))
    .add('kitchen sink', () => (
        <Toolbar title="App Toolbar">
            <ToolbarGroup>
                <button />
            </ToolbarGroup>
        </Toolbar>
    ));

storiesOf('ToolbarGroup', module)
    .add('with title', () => (
        <ToolbarGroup>
            <ToolbarGroupTitle text="Group title" />
        </ToolbarGroup>
    ));

storiesOf('ToolbarGroupTitle', module)
    .add('with text', () => (
        <ToolbarGroupTitle text="Group title" />
    ));