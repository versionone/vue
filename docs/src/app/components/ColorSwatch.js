import React, {PropTypes} from 'react';
import {getForegroundForBackground} from 'vue/utilities/colorManipulator';

const getStyles = colorValue => ({
    root: {
        backgroundColor: colorValue,
        padding: '14px',
        width: '100%'
    },
    name: {
        color: getForegroundForBackground(colorValue, ['#fff', '#000']),
        float: 'left'
    },
    value: {
        color: getForegroundForBackground(colorValue, ['#fff', '#000']),
        float: 'right'
    }
});

const ColorSwatch = ({
    name,
    value
}) => {
    const styles = getStyles(value);
    return (
        <div style={styles.root}>
            <span style={styles.name}>{name}</span>
            <span style={styles.value}>{value}</span>
        </div>
    );
};

ColorSwatch.displayName = 'ColorSwatch';
ColorSwatch.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default ColorSwatch;
