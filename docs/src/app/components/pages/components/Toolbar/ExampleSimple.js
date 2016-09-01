import React from 'react';
import {Toolbar, ToolbarTitle, ToolbarSeparator, ToolbarItem} from 'versionone-ui/Toolbar';

export default class Example extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarTitle text="Toolbar Title" />
                <ToolbarItem label="Input label">
                    <input type="text" />
                </ToolbarItem>
                <ToolbarSeparator />
                <ToolbarItem>
                    <button>Non-Grouped Button</button>
                </ToolbarItem>
            </Toolbar>
        );
    }
}
