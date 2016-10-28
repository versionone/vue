import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

export default () => (ComponentToTheme) => {
    const RadiumEnabledComponent = Radium(ComponentToTheme);
    class ComponentWithThemeEnabled extends Component {
        static contextTypes = {
            theme: PropTypes.object.isRequired
        };

        render() {
            return (
                <RadiumEnabledComponent theme={this.context.theme} />
            );
        }
    }
    return ComponentWithThemeEnabled;
}