import React from 'react';
import ThemeProvider from '@versionone/ui/ThemeProvider';
import TextField from '@versionone/ui/TextField';
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
