import React, {Component, PropTypes} from 'react';
import ThemeProvider from './../ThemeProvider';
import V1Provider from './../V1Provider';

export default class VueProvider extends Component {
    static propTypes = {
        /**
         * Component(s) that are a parent to any child using Vue
         */
        children: PropTypes.node.isRequired,
        /**
         * Theme to be used with Vue
         */
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
        /**
         * Instance of the VersionOne JavaScript SDK
         */
        v1: PropTypes.shape({
            query: PropTypes.func.isRequired,
        }).isRequired,
    };

    static
    childContextTypes = {
        v1: PropTypes.shape({
            query: PropTypes.func.isRequired,
        }).isRequired,
    };

    getChildContext() {
        return {
            v1: this.props.v1,
        };
    }

    render() {
        return (
            <V1Provider v1={this.props.v1}>
                <ThemeProvider theme={this.props.theme}>
                    {this.props.children}
                </ThemeProvider>
            </V1Provider>
        );
    }
}
