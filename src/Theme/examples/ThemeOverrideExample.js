import React from 'react';
import {ThemeProvider, withTheme} from 'vue/Theme';
import TextField from 'vue/TextField';

export default () => {
    const defaultTheme = {
        typography: {
            basicFamily: `'Proxima Nova', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif`,
            small: 14,
            lineHeightNormal: 1.285
        },
        spacing: {
            xxSmallGutter: 3
        },
        color: {
            transparent: 'transparent',
            textPrimary: 'black',
            textSecondary: 'lightgray',
            focusedPrimary: 'blue',
            disabledPrimary: 'gray',
            errorPrimary: 'red',
            errorSecondary: 'pink',
            pendingPrimary: 'yellow',
            normalBackground: 'white',
            fieldBorder: 'darkgray'
        },
        border: {
            normalRadius: 3
        }
    };
    const overrideTheme = {
        typography: {
            basicFamily: `Arial`,
            small: 16,
            lineHeightNormal: 1.5
        },
        spacing: {
            xxSmallGutter: 6
        },
        color: {
            transparent: 'transparent',
            textPrimary: 'blue',
            textSecondary: 'lightblue',
            focusedPrimary: 'green',
            disabledPrimary: 'purple',
            errorPrimary: 'brown',
            errorSecondary: 'brown',
            pendingPrimary: 'orange',
            normalBackground: 'pink',
            fieldBorder: 'gray'
        },
        border: {
            normalRadius: 3
        }
    };

    const CustomTextField = withTheme(overrideTheme)(TextField);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CustomTextField hintText="hint text" required theme={overrideTheme} />
        </ThemeProvider>
    )
};