import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';

const getStyles = (theme, props, state) => {
    // Things to pull from a theme/be configurable/not functional styles-ish
    const height = '48px';
    const fontSize = '16px';
    const fontFamily = 'Arial';

    const rootDefaultStyles = {
        position: 'relative',
        width: `${props.width}px`,
        height: height,
        lineHeight: '24px',
        display: 'inline-block',
        transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        backgroundColor: 'transparent'
    };
    const hintTextDefaultStyles = {
        position: 'absolute',
        width: '100%',
        bottom: '12px',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        fontSize,
        fontFamily,
        color: 'rgba(0, 0, 0, 0.298039)'
    };
    const inputDefaultStyles = {
        width: '100%',
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        height: '100%',
        outline: 'none',
        fontSize,
        fontFamily,
        position: 'relative'
    };
    const underlineDefaultStyles = {
      margin: 0
    };

    return theme.prepareStyles({
        root: rootDefaultStyles,
        hintText: {
            ...hintTextDefaultStyles,
            ...props.hintTextStyle,
            opacity: props.hintText && !state.value ? 1 : 0
        },
        input: inputDefaultStyles,
        underline: underlineDefaultStyles
    });
};

class TextEntryField extends Component {
    static propTypes = {
        hintText: PropTypes.string,
        hintTextStyle: CustomPropTypes.style,
        width: PropTypes.number,
        value: PropTypes.string
    };

    static defaultProps = {
        value: '',
        width: 256,
        hintTextStyle: {}
    };

    static contextTypes = {
        theme: CustomPropTypes.theme
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            value: props.value
        };
    }

    render() {
        const styles = getStyles(this.context.theme, this.props, this.state);
        const {value, hintText} = this.props;

        return (
            <div style={styles.root}>
                <div className="hint-text" style={styles.hintText}>{hintText}</div>
                <input style={styles.input} type="text" defaultValue={value} onKeyUp={this.handleKeyUp} />
                <div>
                    <hr style={styles.underline} />
                </div>
            </div>
        );
    }

    handleKeyUp = (evt) => {
        this.setState({
            value: evt.target.value
        })
    }
}
export default TextEntryField;
