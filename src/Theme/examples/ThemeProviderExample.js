import React from 'react';
import {ThemeProvider} from 'vue/Theme';
import TextField from 'vue/TextField';

export default () => {
    const theme = {
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

    return (
        <ThemeProvider theme={theme}>
            <TextField hintText="hint text" required />
        </ThemeProvider>
    )
};