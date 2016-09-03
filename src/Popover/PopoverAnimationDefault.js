import * as transitions from './../styles/Transitions';
import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import Panel from './../Panel';

function getStyles(props, context, state) {
    const {targetOrigin} = props;
    const {isOpen} = state;
    const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

    return {
        root: {
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scale(1, 1)' : 'scale(0, 0)',
            transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
            position: 'fixed',
            zIndex: 2,
            transition: transitions.easeOut('250ms', ['transform', 'opacity']),
            maxHeight: '100%'
        },
        horizontal: {
            maxHeight: '100%',
            overflowY: 'auto',
            transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
            opacity: isOpen ? 1 : 0,
            transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
            transition: transitions.easeOut('250ms', ['transform', 'opacity'])
        },
        vertical: {
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
            transition: transitions.easeOut('500ms', ['transform', 'opacity'])
        }
    };
}

class PopoverDefaultAnimation extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        isOpen: PropTypes.bool.isRequired,
        style: CustomPropTypes.style,
        targetOrigin: CustomPropTypes.origin.isRequired,
        zDepth: CustomPropTypes.zDepth
    };

    static defaultProps = {
        style: {}
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.setState({isOpen: true});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen
        });
    }

    constructor(...rest) {
        super(...rest);
        this.state = {
            isOpen: false
        };
    }

    render() {
        const {
            className,
            style,
            children
        } = this.props;

        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context, this.state);

        return (
            <Panel
                style={{...styles.root, ...style}}
                className={className}>
                <div style={prepareStyles(styles.horizontal)}>
                    <div style={prepareStyles(styles.vertical)}>
                        {children}
                    </div>
                </div>
            </Panel>
        );
    }
}

export default PopoverDefaultAnimation;