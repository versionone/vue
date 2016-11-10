import {Component, PropTypes} from 'react';

class ThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.element,
        theme: PropTypes.object
    };

    static childContextTypes = {theme: PropTypes.object.isRequired};

    getChildContext() {
        return {theme: this.props.theme};
    }

    render() {
        return this.props.children;
    }
}

export default ThemeProvider;
