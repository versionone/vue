import React from 'react';
import ThemeProvider from 'vue/Theme';
import TextField from 'vue/ExpectedTextField';
import v1Theme from './../../styles/themes/v1Theme';

export default () => {
    const theme = Object.assign({}, v1Theme, {
        _name: 'Test Theme',
        basicFontFamily: `Arial`,
        smallFontSize: 16,
        xxSmallGutter: 6,
        textPrimaryColor: 'blue',
        textSecondaryColor: 'green'
    });

    return (
        <ThemeProvider theme={theme}>
            <TextField hintText="hint text" required />
        </ThemeProvider>
    )
};
