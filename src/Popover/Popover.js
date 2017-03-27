import EventListener from 'react-event-listener';
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import throttle from 'lodash.throttle';
import Radium from './../utilities/Radium';
import RenderToLayer from './../internal/RenderToLayer';
import ThemeProvider from './../ThemeProvider';
import {adjustPosition, getPosition} from './../utilities/position';
import * as CustomPropTypes from './../utilities/CustomPropTypes';
import * as Positions from './Positions';

const resizeThrottleValue = 50;
const scrollThrottleValue = 50;
const offScreenThresholdValue = 0;
const centerAlignmentDivisor = 2;
const getTargetPosition = (targetElement) => ({
    bottom: targetElement.offsetHeight,
    center: targetElement.offsetWidth / centerAlignmentDivisor,
    height: targetElement.offsetHeight,
    left: 0,
    middle: targetElement.offsetHeight / centerAlignmentDivisor,
    right: targetElement.offsetWidth,
    top: 0,
    width: targetElement.offsetWidth,
});

class Popover extends Component {
    static propTypes = {
        /**
         * The element to which the popover will relatively render
         */
        anchorElement: PropTypes.object,
        /**
         * The coordinates of the anchor element in which to align to the target popover's origin
         */
        anchorOrigin: CustomPropTypes.origin,
        /**
         * If true, the popover will close when it exits the viewport
         */
        autoCloseWhenOffScreen: PropTypes.bool,
        /**
         * The children to render within the popover
         */
        children: PropTypes.node,
        /**
         * Function called when the popover is requested to close
         */
        onRequestClose: PropTypes.func,
        /**
         * If true, the popover will be visible; otherwise it will not render
         */
        open: PropTypes.bool,
        /**
         * The coordinates of the popover target in which to align to the anchor's origin
         */
        targetOrigin: CustomPropTypes.origin,
    };
    static defaultProps = {
        anchorOrigin: {
            horizontal: Positions.left,
            vertical: Positions.bottom,
        },
        autoCloseWhenOffScreen: true,
        onRequestClose: () => {
        },
        open: false,
        targetOrigin: {
            horizontal: Positions.left,
            vertical: Positions.top,
        },
    };
    static contextTypes = {
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    constructor(...rest) {
        super(...rest);
        this.state = {
            closing: false,
            open: this.props.open,
        };
        this.setPlacement = this.setPlacement.bind(this);
        this.handleResize = throttle(this.setPlacement.bind(this, false), resizeThrottleValue);
        this.handleScroll = throttle(this.setPlacement.bind(this, true), scrollThrottleValue);
        this.renderLayer = this.renderLayer.bind(this);
        this.handleComponentClickAway = this.handleComponentClickAway.bind(this);
        this.autoCloseWhenOffScreen = this.autoCloseWhenOffScreen.bind(this);
    }

    componentDidMount() {
        this.setPlacement();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open === this.state.open) {
            return;
        }
        if (nextProps.open) {
            this.anchorElement = nextProps.anchorElement || this.props.anchorElement;
            this.setState({
                closing: false,
                open: true,
            });
            return;
        }
        this.setState({
            open: false,
        });
    }

    componentDidUpdate() {
        this.setPlacement();
    }

    componentWillUnmount() {
        this.handleResize = null;
        this.handleScroll = null;
    }

    setPlacement(scrolling, evt) {
        const {
            anchorElement,
            anchorOrigin,
            autoCloseWhenOffScreen,
            open,
            targetOrigin,
        } = this.props;

        if (!open) {
            return;
        }

        const targetLayer = this.layer.getLayer();
        if (!targetLayer) {
            return;
        }

        const targetElement = targetLayer.children[0];
        if (!targetElement) {
            return;
        }

        const anchorEl = anchorElement || this.anchorElement || findDOMNode(this);

        const anchorPosition = getPosition(anchorEl);
        const targetPosition = getTargetPosition(targetElement);
        const adjustedPosition = adjustPosition(anchorPosition, anchorOrigin, targetPosition, targetOrigin);

        if (scrolling && autoCloseWhenOffScreen) {
            this.autoCloseWhenOffScreen(evt, anchorPosition);
        }
        targetElement.style.left = `${Math.max(offScreenThresholdValue, adjustedPosition.left)}px`;
        targetElement.style.maxHeight = `${window.innerHeight}px`;
        targetElement.style.top = `${Math.max(offScreenThresholdValue, adjustedPosition.top)}px`;
        targetElement.style.width = `${adjustedPosition.width}px`;
    }

    renderLayer() {
        const {
            children,
        } = this.props;
        const {
            open,
        } = this.state;
        if (!open) {
            return null;
        }
        const style = {
            position: 'fixed',
        };
        return (
            <div
                style={style}
            >
                {children}
            </div>
        );
    }

    handleComponentClickAway(evt) {
        this.requestClose(evt, 'clickedAway');
    }

    requestClose(evt, reason) {
        const {
            onRequestClose,
        } = this.props;
        onRequestClose(evt, reason);
    }

    autoCloseWhenOffScreen(evt, anchorPosition) {
        if (anchorPosition.top < offScreenThresholdValue
            || anchorPosition.top > window.innerHeight
            || anchorPosition.left < offScreenThresholdValue
            || anchorPosition.left > window.innerWidth) {
            this.requestClose(evt, 'offScreen');
        }
    }

    render() {
        const {
            open,
        } = this.state;
        return (
            <div>
                <EventListener
                    target="window"
                    onResize={this.handleResize}
                    onScroll={this.handleScroll}
                />
                <RenderToLayer
                    open={open}
                    ref={(el) => {
                        this.layer = el;
                    }}
                    render={this.renderLayer}
                    onComponentClickAway={this.handleComponentClickAway}
                />
            </div>
        );
    }
}
export default Radium(Popover);
