import React, {Component} from 'react';

class ToolbarSpacer extends Component {
    render() {
        const spacerStyle = {
            flex: '1'
        };
        return (
            <div style={spacerStyle}></div>
        );
    }
}
export default ToolbarSpacer;
