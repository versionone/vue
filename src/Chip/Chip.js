import React, {PropTypes} from 'react';
import {darken, toRgbaString} from '@andrew-codes/color-functions';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import {IconButton} from './../Button';
import {CloseIcon} from './../Icons';

const chipPaddingFontSizeDivisor = 3;

const getStyles = (props, context) => {
    const padding = Math.floor(props.fontSize / chipPaddingFontSizeDivisor);
    const {
        basicFontFamily,
        normalRadius,
        xxSmallGutter,
    } = context.theme;
    return ({
        buttonWrapper: {
            alignSelf: 'center',
            marginLeft: `${props.fontSize}px`,
        },
        root: {
            backgroundColor: props.backgroundColor,
            borderRadius: `${normalRadius}px`,
            color: props.color,
            display: 'flex',
            fontSize: `${props.fontSize}px`,
            lineHeight: `${props.lineHeight}`,
            margin: `${xxSmallGutter}px`,
            padding: `${padding}px ${padding}px`,
            width: props.fullWidth ? '100%' : `${props.width}px`,
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

const handleIconButtonClick = (text, oid, handler) => (evt) => {
    handler({
        oid,
        text,
    }, evt);
};

const Chip = (props, context) => {
    const {
        backgroundColor,
        color,
        fontSize,
        fullWidth,
        lineHeight,
        oid,
        text,
        onRequestRemove,
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

    return (
        <div style={styles.root}>
            <div style={styles.wrapper}>
                <span style={styles.text}>{text}</span>
                <div style={styles.buttonWrapper}>
                    <IconButton
                        circle
                        color={toRgbaString(darken(backgroundColor, iconButtonDarkenCoefficient))}
                        icon={CloseIcon}
                        width={fontSize * lineHeight}
                        onClick={handleIconButtonClick(text, oid, onRequestRemove)}
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
     * The unique identifier for the text of this Chip; useful when needing to reference a specific Chip for `onRequestRemove` callback
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
    backgroundColor: 'gray',
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
export default Radium(Chip);
