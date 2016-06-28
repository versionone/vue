import {Component, PropTypes} from 'react';
import getTheme from './getTheme';

class ThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.element,
        theme: PropTypes.object
    };

    static childContextTypes = {
        theme: PropTypes.object.isRequired,
        window: PropTypes.object.isRequired
    };

    getChildContext() {
        return {
            theme: this.props.theme || getTheme(),
            window: this.state.window
        };
    }

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        return this.props.children;
    }

    resize = (evt) => {
        this.setState({
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    };
}

export default ThemeProvider;