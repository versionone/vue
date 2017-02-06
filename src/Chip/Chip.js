import React, {PropTypes} from 'react';
import {darken, toRgbaString} from '@andrew-codes/color-functions';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import {createEventHandler} from './../utilities/component';
import {IconButton} from './../Button';
import {CloseIcon} from './../Icons';
import {xxSmall} from './../Button/Sizes';

const getStyles = (props, context) => {
    const {
        backgroundColor,
        color,
        fontSize,
        fullWidth,
        lineHeight,
        width,
    } = props;
    const {
        basicFontFamily,
        normalRadius,
        smallGutter,
        xxSmallGutter,
    } = context.theme;

    return ({
        buttonWrapper: {
            display: 'flex',
            marginLeft: `${fontSize}px`,
        },
        root: {
            backgroundColor,
            borderRadius: `${normalRadius}px`,
            boxSizing: 'border-box',
            color,
            display: 'flex',
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}`,
            margin: `${xxSmallGutter}px`,
            padding: `${smallGutter}px`,
            width: fullWidth ? '100%' : `${width}px`,
        },
        text: {
            alignSelf: 'center',
            flex: 1,
            fontFamily: basicFontFamily,
        },
        wrapper: {
            alignSelf: 'center',
            display: 'flex',
            width: '100%',
        },
    });
};

const Chip = (props, context) => {
    const {
        backgroundColor,
        color,
        fontSize,
        fullWidth,
        lineHeight,
        oid,
        onRequestRemove,
        text,
        width,
    } = props;
    const styles = getStyles({
        backgroundColor,
        color,
        fontSize,
        fullWidth,
        width,
    }, context);
    const iconButtonDarkenCoefficient = 0.45;
    const handleClick = createEventHandler(onRequestRemove, oid);

    return (
        <div style={styles.root}>
            <div style={styles.wrapper}>
                <span style={styles.text}>{text}</span>
                <div style={styles.buttonWrapper}>
                    <IconButton
                        circle
                        color={toRgbaString(darken(backgroundColor, iconButtonDarkenCoefficient))}
                        icon={CloseIcon}
                        size={xxSmall}
                        width={fontSize * lineHeight}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
};
Chip.propTypes = {
    /**
     * Background color of the chip
     */
    backgroundColor: PropTypes.string,
    /**
     * Font color of the chip
     */
    color: PropTypes.string,
    /**
     * Font size used for the text of the Chip
     */
    fontSize: PropTypes.number,
    /**
     * The Chip will expand to fill the container's space if true; otherwise it will inline-block like with a width
     */
    fullWidth: PropTypes.bool,
    /**
     * Line height for the text of the Chip
     */
    lineHeight: PropTypes.number,
    /**
     * Unique identifier for this Chip
     */
    oid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    /**
     * Function handling the clicking of the close icon of the Chip
     */
    onRequestRemove: PropTypes.func,
    /**
     * The text to render on the Chip
     */
    text: PropTypes.string.isRequired,
    /**
     * Width of the Chip
     */
    width: PropTypes.number,
};
Chip.defaultProps = {
    backgroundColor: '#ccc',
    color: '#000',
    fontSize: 14,
    fullWidth: false,
    lineHeight: 1,
    onRequestRemove: () => {
    },
    width: 200,
};
Chip.contextTypes = {
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
Chip.displayName = 'Chip';
export default Radium(Chip);
