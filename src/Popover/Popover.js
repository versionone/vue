import classNames from 'classnames';
import EventListener from 'react-event-listener';
import React, {Component, PropTypes} from 'react';
import throttle from 'lodash.throttle';
import {findDOMNode} from 'react-dom';
import Radium from './../utilities/Radium';
import RenderToLayer from './../internal/RenderToLayer';
import ThemeProvider from './../ThemeProvider';
import {
    adjustPositionWithinBoundaries,
    getDocumentPosition,
    getPosition,
    getViewportPosition
} from '../utilities/position';
import * as CustomPropTypes from './../utilities/CustomPropTypes';
import * as Positions from './Positions';
import {isDescendant} from './../utilities/dom';

const resizeThrottleValue = 50;
const offScreenThresholdValue = 0;
const centerAlignmentDivisor = 2;
const getTargetPosition = (targetElement) => ({
    center: targetElement.scrollWidth / centerAlignmentDivisor,
    height: targetElement.offsetHeight,
    left: 0,
    middle: targetElement.offsetHeight / centerAlignmentDivisor,
    top: 0,
    width: targetElement.scrollWidth,
});

const isOffScreen = (elementPosition, viewportPosition) =>
    (elementPosition.top < offScreenThresholdValue
        || elementPosition.top > viewportPosition.height
        || elementPosition.left < offScreenThresholdValue
        || elementPosition.left > viewportPosition.width);

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
         * CSS class name for root element of the popover
         */
        className: PropTypes.string,
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
        this.handleRendered = this.handleRendered.bind(this);
        this.handleResize = throttle(this.setPlacement.bind(this, false), resizeThrottleValue);
        this.handleScroll = this.placeOnNextAnimationFrame.bind(this);
        this.renderLayer = this.renderLayer.bind(this);
        this.handleComponentClickAway = this.handleComponentClickAway.bind(this);
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

    componentWillUnmount() {
        this.handleResize = null;
        this.handleScroll = null;
    }

    lastPlaceOnScrollFrameRequest = null;

    placeOnNextAnimationFrame(evt) {
        if (this.lastPlaceOnScrollFrameRequest) {
            cancelAnimationFrame(this.lastPlaceOnScrollFrameRequest);
        }
        this.lastPlaceOnScrollFrameRequest = requestAnimationFrame(() => {
            this.setPlacement(true, evt);
            this.lastPlaceOnScrollFrameRequest = null;
        });
    }

    setPlacement(scrolling, evt) {
        const {
            anchorElement,
            anchorOrigin,
            autoCloseWhenOffScreen,
            open,
            targetOrigin,
        } = this.props;

        if (!open || !this.layer) {
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
        const viewportPosition = getViewportPosition();
        const isAnchorOffScreen = isOffScreen(anchorPosition, viewportPosition);
        const documentPosition = getDocumentPosition();
        const referencePoint = !autoCloseWhenOffScreen && isAnchorOffScreen
            ? documentPosition
            : viewportPosition;

        const popoverPosition = adjustPositionWithinBoundaries(
            anchorPosition,
            anchorOrigin,
            targetPosition,
            targetOrigin,
            referencePoint);

        popoverPosition.top = autoCloseWhenOffScreen
            ? Math.max(offScreenThresholdValue, popoverPosition.top)
            : popoverPosition.top;

        if (scrolling && autoCloseWhenOffScreen && isAnchorOffScreen) {
            this.requestClose(evt, 'offScreen');
        }
        targetElement.style.left = `${popoverPosition.left}px`;

        if (!scrolling) {
            // If there should be a scrollbar
            if ((popoverPosition.top + popoverPosition.height) >= (viewportPosition.top + viewportPosition.height)) {
                // Size minimum width based on browser width calculation
                targetElement.style.overflowY = 'scroll';
                const widthWithVScrollbar = parseFloat(window.getComputedStyle(targetElement).width);
                targetElement.style.overflowY = 'hidden';
                const widthWithoutVScrollbar = parseFloat(window.getComputedStyle(targetElement).width);
                targetElement.style.minWidth = `${Math.max(widthWithoutVScrollbar, widthWithVScrollbar)}px`;
                targetElement.style.overflowY = 'auto';
                targetElement.style.overflowX = 'hidden';
            }

            const maxHeight = viewportPosition.height - popoverPosition.top;
            targetElement.style.maxHeight = `${maxHeight}px`;
        }

        targetElement.style.top = `${popoverPosition.top}px`;
    }

    handleRendered() {
        this.setPlacement();
    }

    renderLayer() {
        const {
            children,
            className,
            anchorElement,
        } = this.props;
        const {
            open,
        } = this.state;

        if (!open) {
            return null;
        }

        const anchorEl = anchorElement || this.anchorElement || findDOMNode(this);
        if (!isDescendant(document, anchorEl)) {
            return null;
        }

        const style = {
            position: 'fixed',
        };
        return (
            <div
                className={classNames(className)}
                style={style}
            >
                {children}
            </div>
        );
    }

    handleComponentClickAway(evt) {
        const anchorEl = this.anchorElement || findDOMNode(this);
        if ((evt.type === 'click' && isDescendant(anchorEl, evt.target)) || anchorEl === evt.target) return;

        this.requestClose(evt, 'clickedAway');
    }

    requestClose(evt, reason) {
        const {
            onRequestClose,
        } = this.props;
        onRequestClose(evt, reason);
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
                        if (el) {
                            this.layer = el;
                        }
                    }}
                    render={this.renderLayer}
                    onComponentClickAway={this.handleComponentClickAway}
                    onRendered={this.handleRendered}
                />
            </div>
        );
    }
}

export default Radium(Popover);
