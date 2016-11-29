import React, {Component, PropTypes} from 'React';

class SvgIcon extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        color: PropTypes.string,
        hoverColor: PropTypes.string,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
    };

    static defaultProps = {
        color: '#000',
        onMouseEnter: () => {
        },
        onMouseLeave: () => {
        }
    };

    constructor(...rest) {
        super(...rest);
        this.state = {
            isHovered: false
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getStyles = this.getStyles.bind(this);
    }

    handleMouseEnter() {
        this.setState({isHovered: true});
        this.props.onMouseEnter();
    }

    handleMouseLeave() {
        this.setState({isHovered: false});
        this.props.onMouseLeave();
    }

    getStyles() {
        const {
            color,
            hoverColor
        } = this.props;
        const {isHovered} = this.state;

        return {
            root: {
                fill: isHovered ? hoverColor : color
            }
        };
    }

    render() {
        const {children} = this.props;
        const styles = this.getStyles();
        return (
            <svg
                {...this.props}
                style={styles.root}
                viewBox="0 0 24 24"
                x="0px"
                y="0px"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {children}
            </svg>
        );
    }
}
export default SvgIcon;
