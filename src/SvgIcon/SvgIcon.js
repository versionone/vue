import React, {Component, PropTypes} from 'react';
import {create} from './../styles/Transitions';

class SvgIcon extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        color: PropTypes.string,
        hoverColor: PropTypes.string,
        transition: PropTypes.string,
        width: PropTypes.number,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
    };

    static defaultProps = {
        color: '#000',
        transition: create('0.25s', 'fill'),
        width: 24,
        onMouseEnter: () => {
        },
        onMouseLeave: () => {
        }
    };

    constructor(...rest) {
        super(...rest);
        this.state = {isHovered: false};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getStyles = this.getStyles.bind(this);
    }

    handleMouseEnter(evt) {
        this.setState({isHovered: true});
        this.props.onMouseEnter(evt);
    }

    handleMouseLeave(evt) {
        this.setState({isHovered: false});
        this.props.onMouseLeave(evt);
    }

    getStyles() {
        const {
            color,
            hoverColor,
            transition,
            width
        } = this.props;
        const {isHovered} = this.state;

        return {
            root: {
                fill: isHovered ? hoverColor : color,
                height: `${width}px`,
                transition,
                width: `${width}px`
            }
        };
    }

    render() {
        const {children, onClick} = this.props;
        const styles = this.getStyles();
        const eventHandlerProps = Object.keys(this.props)
            .filter(key => key.startsWith('on'))
            .reduce((output, key) => ({
                ...output,
                [key]: this.props[key]
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
