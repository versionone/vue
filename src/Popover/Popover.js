import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import classNames from 'classnames';
import throttle from 'throttle-debounce/throttle';
import RenderToLayer from './../internal/RenderToLayer';
import * as CustomPropTypes from './../utilities/PropTypes';
import {findDOMNode} from 'react-dom';
import PopoverAnimationDefault from './PopoverAnimationDefault';

class Popover extends Component {
    static propTypes = {
        children: PropTypes.node,
        isOpen: PropTypes.bool,
        anchorElement: PropTypes.object,
        anchorOrigin: CustomPropTypes.origin,
        targetOrigin: CustomPropTypes.origin,
        shouldAutoAdjustPosition: PropTypes.bool,
        shouldAutoCloseWhenOffScreen: PropTypes.bool,
        onRequestClose: PropTypes.func,
        isAnimated: PropTypes.bool,
        animation: PropTypes.func,
        style: CustomPropTypes.style,
        className: PropTypes.string
    };

    static defaultProps = {
        isOpen: false,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        targetOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        shouldAutoCloseWhenOffScreen: true,
        shouldAutoAdjustPosition: true,
        onRequestClose: () => {
        },
        isAnimated: true,
        animation: PopoverAnimationDefault,
        style: {
            overflowY: 'auto',
        },
        className: ''
    };

    componentDidUpdate() {
        this.setPopoverPlacement();
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            if (nextProps.isOpen) {
                this.anchorElement = nextProps.anchorElement || this.props.anchorElement;
                this.setState({
                    isOpen: true,
                    isClosing: false
                });
            } else {
                if (nextProps.isAnimated) {
                    this.setState({isClosing: true});
                    this.animationTimeout = setTimeout(() => {
                        this.setState({
                            isOpen: false,
                        });
                    }, 500);
                } else {
                    this.setState({
                        isOpen: false,
                    });
                }
            }
        }
    }

    constructor(props, ...rest) {
        super(props, ...rest);
        this.handleResize = throttle(100, this.setPopoverPlacement);
        this.handleScroll = throttle(50, this.setPopoverPlacement.bind(this, true));

        this.state = {
            isOpen: props.isOpen,
            isClosing: false
        };
    }

    render() {
        const {
            className
        } = this.props;
        const {
            isOpen
        } = this.state;
        return (
            <div style={{display: 'none'}}>
                <EventListener
                    target="window"
                    onScroll={this.handleScroll}
                    onResize={this.handleResize}
                    capture={false}
                />
                <RenderToLayer
                    ref="layer"
                    isOpen={isOpen}
                    onComponentClickAway={this.componentClickAway}
                    render={this.renderLayer}
                    className={classNames('popover', className)}
                />
            </div>
        );
    }

    setPopoverPlacement = (isScrolling) => {
        if (!this.state.isOpen) {
            return;
        }
        if (!this.refs.layer.getLayer()) {
            return;
        }

        const targetEl = this.refs.layer.getLayer().children[0];
        if (!targetEl) {
            return;
        }

        const anchorEl = this.props.anchorElement || this.anchorElement;
        const {targetOrigin, anchorOrigin} = this.props;
        const anchorPosition = this.getAnchorPosition(anchorEl);
        let targetPosition = this.getTargetPosition(targetEl);
        let targetTopLeft = {
            top: anchorPosition[anchorOrigin.vertical] - targetPosition[targetOrigin.vertical],
            left: anchorPosition[anchorOrigin.horizontal] - targetPosition[targetOrigin.horizontal]
        };

        if (isScrolling && this.props.shouldAutoCloseWhenOffScreen) {
            this.autoCloseWhenOffScreen(anchorPosition);
        }

        if (this.props.shouldAutoAdjustPosition) {
            targetPosition = this.getTargetPosition(targetEl);
            targetTopLeft = this.autoAdjustTargetPosition(anchorPosition, targetPosition, targetOrigin, anchorOrigin, targetTopLeft);
        }

        targetEl.style.top = `${Math.max(0, targetTopLeft.top)}px`;
        targetEl.style.left = `${Math.max(0, targetTopLeft.left)}px`;
        targetEl.style.maxHeight = `${window.innerHeight}px`;
    };

    getAnchorPosition = (anchorElement) => {
        if (!anchorElement) {
            anchorElement = findDOMNode(this);
        }

        const boundingRect = anchorElement.getBoundingClientRect();
        const anchorPosition = {
            top: boundingRect.top,
            left: boundingRect.left,
            width: anchorElement.offsetWidth,
            height: anchorElement.offsetHeight
        };

        anchorPosition.right = boundingRect.right || anchorPosition.left + anchorPosition.width;
        anchorPosition.bottom = boundingRect.bottom || anchorPosition.top + anchorPosition.height;
        anchorPosition.middle = anchorPosition.left + ((anchorPosition.right - anchorPosition.left) / 2);
        anchorPosition.center = anchorPosition.top + ((anchorPosition.bottom - anchorPosition.top) / 2);

        return anchorPosition;

    };

    getTargetPosition = (targetElement) => {
        return {
            top: 0,
            center: targetElement.offsetHeight / 2,
            bottom: targetElement.offsetHeight,
            left: 0,
            middle: targetElement.offsetWidth / 2,
            right: targetElement.offsetWidth,
        };
    };

    autoCloseWhenOffScreen = (anchorPosition) => {
        if (anchorPosition.top < 0 ||
            anchorPosition.top > window.innerHeight ||
            anchorPosition.left < 0 ||
            anchorPosition.left > window.innerWidth) {
            this.requestClose('Off screen');
        }
    };

    requestClose = (reason) => {
        this.props.onRequestClose(reason);
    };

    autoAdjustTargetPosition = (anchorPosition, targetPosition, anchorOrigin, targetOrigin, targetTopLeft) => {
        const {positions, anchorPos} = this.getPositions(anchorOrigin, targetOrigin);

        if (targetTopLeft.top < 0 || targetTopLeft.top + targetPosition.bottom > window.innerHeight) {
            let newTop = anchorPosition[anchorPos.vertical] - targetPosition[positions.y[0]];
            if (newTop + targetPosition.bottom <= window.innerHeight) {
                targetTopLeft.top = Math.max(0, newTop);
            }
            else {
                newTop = anchorPosition[anchorPos.vertical] - targetPosition[positions.y[1]];
                if (newTop + targetPosition.bottom <= window.innerHeight) {
                    targetTopLeft.top = Math.max(0, newTop);
                }
            }
        }

        if (targetTopLeft.left < 0 || targetTopLeft.left + targetPosition.right > window.innerWidth) {
            let newLeft = anchorPosition[anchorPos.horizontal] - targetPosition[positions.x[0]];
            if (newLeft + targetPosition.right <= window.innerWidth) {
                targetTopLeft.left = Math.max(0, newLeft);
            }
            else {
                newLeft = anchorPosition[anchorPos.horizontal] - targetPosition[positions.x[1]];
                if (newLeft + targetPosition.right <= window.innerWidth) {
                    targetTopLeft.left = Math.max(0, newLeft);
                }
            }
        }

        return targetTopLeft;
    };

    getPositions = (anchorOrigin, targetOrigin) => {
        const anchor = {...anchorOrigin};
        const target = {...targetOrigin};

        const positions = {
            x: ['left', 'right'].filter((p) => p !== target.horizontal),
            y: ['top', 'bottom'].filter((p) => p !== target.vertical)
        };

        const overlap = {
            x: this.getOverlapMode(anchor.horizontal, target.horizontal, 'middle'),
            y: this.getOverlapMode(anchor.vertical, target.vertical, 'center')
        };

        positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
        positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

        if (overlap.y !== 'auto') {
            anchor.vertical = anchor.vertical === 'top' ? 'bottom' : 'top';
            if (overlap.y === 'inclusive') {
                // t.vertical = t.vertical;
            }
        }

        if (overlap.x !== 'auto') {
            anchor.horizontal = anchor.horizontal === 'left' ? 'right' : 'left';
            if (overlap.y === 'inclusive') {
                // t.horizontal = t.horizontal;
            }
        }

        return {
            positions: positions,
            anchorPos: anchor
        };
    };

    getOverlapMode = (anchor, target, median) => {
        if ([anchor, target].indexOf(median) >= 0) {
            return 'auto';
        }
        if (anchor === target) {
            return 'inclusive';
        }
        return 'exclusive';
    };

    componentClickAway = () => this.requestClose('Clicked away');

    renderLayer = () => {
        const {
            animation,
            children,
            style,
            ...rest,
        } = this.props;
        const {
            isOpen,
            isClosing
        } = this.state;

        let Animation = animation;
        let styleRoot = style;

        // if (!Animation) {
        //     if (!this.state.isOpen) {
        //         return null;
        //     }
        //     Animation = Panel;
        //     styleRoot = {
        //         position: 'fixed',
        //     };
        // }

        return (
            <Animation {...rest} style={styleRoot} open={isOpen && !isClosing}>
                {children}
            </Animation>
        );
    };
}

export default Popover;