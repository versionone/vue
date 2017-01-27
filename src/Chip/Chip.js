import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import {IconButton} from './../Button';
import {AddIcon} from './../Icons';

const getStyles = (props, context) => {
    const padding = Math.floor(props.fontSize / 3);
    return ({
        buttonWrapper: {
            marginLeft: `${props.fontSize}px`,
        },
        root: {
            color: props.color,
            backgroundColor: props.backgroundColor,
            borderRadius: `${context.theme.normalRadius}px`,
            display: 'flex',
            fontSize: `${props.fontSize}px`,
            lineHeight: `${props.lineHeight}`,
            padding: `${padding}px ${padding}px ${padding}px ${props.fontSize / 2}px`,
            margin: `${context.theme.xxSmallGutter}px`,
            width: props.fullWidth ? '100%' : `${props.width}px`,
        },
        text: {
            flex: 1,
            alignSelf: 'center',
        },
        wrapper: {
            alignSelf: 'center',
            display: 'flex',
            width: '100%',
        }
    });
};

const handleIconButtonClick = (text, oid, handler) => (evt) => {
    handler({
        oid,
        text
    }, evt);
};

const defaultProps = {
    color: '#000',
    backgroundColor: 'gray',
    fontSize: 14,
    fullWidth: false,
    lineHeight: 1,
    width: 200,
    onRequestRemove: () => {
    },
};
const Chip = (props, context) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props
    };
    const {
        oid,
        text,
        onRequestRemove,
    } = propsWithDefaults;
    const styles = getStyles(propsWithDefaults, context);

    return (
        <div style={styles.root}>
            <div style={styles.wrapper}>
                <span style={styles.text}>{text}</span>
                <div style={styles.buttonWrapper}>
                    <IconButton
                        circle
                        icon={AddIcon}
                        width={propsWithDefaults.fontSize * propsWithDefaults.lineHeight}
                        onClick={handleIconButtonClick(text, oid, onRequestRemove)}
                    />
                </div>
            </div>
        </div>
    );
};
Chip.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    fullWidth: PropTypes.bool,
    lineHeight: PropTypes.number,
    oid: PropTypes.string,
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    onRequestRemove: PropTypes.func,
};
Chip.contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};
export default Radium(Chip);
