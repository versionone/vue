import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import {IconButton} from './../Button';
import {AddIcon} from './../Icons';

const getStyles = (props) => {
    const padding = Math.floor(props.fontSize / 3);
    return ({
        buttonWrapper: {
            marginLeft: `${props.fontSize}px`,
        },
        root: {
            color: props.color,
            backgroundColor: props.backgroundColor,
            borderRadius: `${props.fontSize * props.lineHeight}px`,
            display: 'flex',
            fontSize: `${props.fontSize}px`,
            lineHeight: `${props.lineHeight}`,
            padding: `${padding}px ${padding}px ${padding}px ${props.fontSize / 2}px`,
            margin: '4px',
            width: props.fullWidth ? '100%' : Boolean(props.width) ? `${props.width}px` : '',
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

const defaultProps = {
    color: '#000',
    backgroundColor: 'gray',
    fontSize: 14,
    lineHeight: 1,
};

const Chip = (props) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props
    };
    const {
        text
    } = propsWithDefaults;
    const styles = getStyles(propsWithDefaults);

    return (
        <div style={styles.root}>
            <div style={styles.wrapper}>
                <span style={styles.text}>{text}</span>
                <div style={styles.buttonWrapper}>
                    <IconButton
                        circle
                        icon={AddIcon}
                        width={propsWithDefaults.fontSize * propsWithDefaults.lineHeight}
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
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
};
export default Radium(Chip);
