import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSpacer, ToolbarItem} from 'versionone-ui/Toolbar';

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
                <ToolbarSpacer />
                <ToolbarItem>
                    <button>Non-Grouped Button</button>
                </ToolbarItem>
            </Toolbar>
        );
    }
}
