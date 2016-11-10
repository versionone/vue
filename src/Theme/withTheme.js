import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {recursive as merge} from 'merge';

export default themeOverride => (ComponentToTheme) => {
    const RadiumEnabledComponent = Radium(ComponentToTheme);
    class ComponentWithThemeEnabled extends Component {
        static displayName = ComponentToTheme.name;
        static propTypes = ComponentToTheme.propTypes;
        static defaultProps = ComponentToTheme.defaultProps;
        static contextTypes = {theme: PropTypes.object.isRequired};

        render() {
            return (
                <RadiumEnabledComponent
                    theme={merge(this.context.theme, themeOverride)}
                    {...this.props} />
            );
        }
    }
    return ComponentWithThemeEnabled;
};
