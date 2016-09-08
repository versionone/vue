import React, {Component, PropTypes} from 'react';

class ToolbarSpacer extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    render() {
        const {prepareStyles} = this.context.theme;
        const spacerStyle = {
            flex: '1'
        };
        return (
            <div style={prepareStyles(spacerStyle)}></div>
        );
    }
}

export default ToolbarSpacer;