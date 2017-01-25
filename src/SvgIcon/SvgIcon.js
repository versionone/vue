import React, {Component, PropTypes, } from 'react';

const defaultTransition = 'fill 0.25s linear 0ms';
class SvgIcon extends Component {
    static propTypes = {
        /**
         * SVG element's body to be rendered.
         */
        children: PropTypes.node.isRequired,
        /**
         * Fill color of the SVG.
         */
        color: PropTypes.string,
        /**
         * Fill color to apply when hovering over the SVG.
         */
        hoverColor: PropTypes.string,
        /**
         * Transition to apply to SVG; typically used for fill color on hover.
         */
        transition: PropTypes.string,
        /**
         * Width of the SVG; also applies this as the height.
         */
        width: PropTypes.number,
        /**
         * onClick event handler
         */
        onClick: PropTypes.func,
        /**
         * onMouseEnter event handler.
         */
        onMouseEnter: PropTypes.func,
        /**
         * onMouseLeave event handler.
         */
        onMouseLeave: PropTypes.func,
    };

    static defaultProps = {
        color: '#000',
        transition: defaultTransition,
        width: 24,
        onClick: () => {
        },
        onMouseEnter: () => {
        },
        onMouseLeave: () => {
        },
    };

    constructor(...rest) {
        super(...rest);
        this.state = {isHovered: false, };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getStyles = this.getStyles.bind(this);
    }

    handleMouseEnter(evt) {
        this.setState({isHovered: true, });
        this.props.onMouseEnter(evt);
    }

    handleMouseLeave(evt) {
        this.setState({isHovered: false, });
        this.props.onMouseLeave(evt);
    }

    getStyles() {
        const {
            color,
            hoverColor,
            transition,
            width,
        } = this.props;
        const {isHovered, } = this.state;

        return {
            root: {
                fill: isHovered ? hoverColor : color,
                height: `${width}px`,
                margin: 0,
                padding: 0,
                transition,
                width: `${width}px`,
            },
        };
    }

    render() {
        const {children, onClick, } = this.props;
        const styles = this.getStyles();
        const eventHandlerProps = Object.keys(this.props)
            .filter(key => key.startsWith('on'))
            .reduce((output, key) => ({
                ...output,
                [key]: this.props[key],
            }), {});

        return (
            <svg
                {...eventHandlerProps}
                style={styles.root}
                viewBox="0 0 24 24"
                x="0px"
                y="0px"
                onClick={onClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {children}
            </svg>
        );
    }
}
export default SvgIcon;
