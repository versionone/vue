import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, ToolbarItem} from 'versionone-ui/Toolbar';

export default class Example extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarTitle text="Toolbar Title" />
                <ToolbarGroup>
                    <ToolbarItem label="Input label">
                        <input type="text" />
                    </ToolbarItem>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarItem>
                    <button>Non-Grouped Button</button>
                </ToolbarItem>
            </Toolbar>
        );
    }
}
