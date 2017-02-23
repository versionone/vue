import React, {Component, PropTypes} from 'react';
import ThemeProvider from './../ThemeProvider';

export default class VueProvider extends Component {
    static propTypes = {
        /**
         * Component(s) that are a parent to any child using Vue
         */
        children: PropTypes.node.isRequired,
        /**
         * Instance of the VersionOne JavaScript SDK
         */
        sdk: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired,
        /**
         * Theme to be used with Vue
         */
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    static
    childContextTypes = {
        sdk: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired,
    };

    getChildContext() {
        return {
            sdk: this.props.sdk,
        };
    }

    render() {
        return React.createElement(new ThemeProvider({
                children: this.props.children,
                theme: this.props.theme,
            })
        );
    }
}
