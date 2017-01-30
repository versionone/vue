import React, {
    Component,
    PropTypes
} from 'react';
import ThemeProvider from './../Theme';

export default ComponentToTrackHover => class TrackingHover extends Component {
    static propTypes = Component.propTypes;
    static contextTypes = {
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };
    static
    childContextTypes = {
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    getChildContext() {
        return this.context;
    }

    constructor(...rest) {
        super(...rest);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.state = {
            hovered: false,
        };
    }

    handleMouseEnter() {
        this.setState({
            hovered: true,
        });
    }

    handleMouseLeave() {
        this.setState({
            hovered: false,
        });
    }

    render() {
        const {
            hovered,
        } = this.state;

        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <ComponentToTrackHover
                    {...this.props}
                    hovered={hovered}
                />
            </div>
        );
    }
};
