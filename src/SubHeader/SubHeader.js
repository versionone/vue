import React, {Component, PropTypes} from 'react';
import ThemeProvider from './../Theme';

export default class extends Component {
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
