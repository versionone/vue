import React, {Component, PropTypes} from 'react';
import transparent from './Transparent';
import {easeOut} from './../styles/Transitions';

export default (Component) => {
    return class HoverEnabled extends Component {
        static propTypes = {
            hoverBackgroundColor: PropTypes.string,
            hoverColor: PropTypes.string,
            ...Component.propTypes,
        };

        constructor(...rest) {
            super(...rest);
            this.getStyles = this.getStyles.bind(this);
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

        getStyles() {
            const {
                hoverBackgroundColor,
                hoverColor,
            } = this.props;
            const {
                hovered
            } = this.state;
            const backgroundColor = hovered
                ? (hoverBackgroundColor || transparent)
                : transparent;
            const colorObj = hovered
                ? {color: hoverColor}
                : {};

            return {
                root: {
                    backgroundColor,
                    ...colorObj,
                    transition: easeOut('450ms', 'background-color', '0s'),
                }
            };
        }

        render() {
            const styles = this.getStyles();

            return (
                <div
                    style={styles.root}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <Component {...this.props} />
                </div>
            )
        }
    };
};
