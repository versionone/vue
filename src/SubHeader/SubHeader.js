import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';

class SubHeader extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]),
    };
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

    render() {
        const {children} = this.props;
        return (
            <header>
                {children}
            </header>
        );
    }
}
export default Radium(SubHeader);
