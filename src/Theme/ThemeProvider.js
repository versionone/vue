import {Component, PropTypes} from 'react';
import getTheme from './getTheme';

class ThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.element,
        theme: PropTypes.object
    };

    static childContextTypes = {
        theme: PropTypes.object.isRequired
    };

    getChildContext() {
        return {
            theme: this.props.theme || getTheme()
        };
    }

    constructor(props, ...rest) {
        super(props, ...rest);
    }

    render() {
        return this.props.children;
    }
}

export default ThemeProvider;