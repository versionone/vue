import React, {Component, PropTypes} from 'react';
import {fullyVisible as opacityFullyVisible, hidden as opacityHidden} from './../utilities/Opacity';
import Radium from './../utilities/Radium';

class RequiredIndicator extends Component {
    static propTypes = {hidden: PropTypes.bool};

    static defaultProps = {hidden: false};

    static contextTypes = {
        theme: PropTypes.shape({
            color: PropTypes.shape({requiredPrimary: PropTypes.string}),
            typography: PropTypes.shape({
                lineHeightNormal: PropTypes.number,
                small: PropTypes.number
            })
        })
    };

    constructor(...args) {
        super(...args);
        this.getStyles = this.getStyles.bind(this);
    }

    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.root}>*</div>
        );
    }

    getStyles() {
        const {
            color: {requiredPrimary},
            typography: {
                lineHeightNormal,
                small
            }
        } = this.context.theme;
        const {hidden} = this.props;
        const zIndex = 1;

        return {
            root: {
                alignSelf: 'center',
                color: requiredPrimary,
                fontSize: small,
                lineHeight: lineHeightNormal,
                opacity: hidden ? opacityHidden : opacityFullyVisible,
                zIndex
            }
        };
    }
}
export default Radium(RequiredIndicator);
