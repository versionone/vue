import React from 'react';
import ThemeProvider from '@versionone/ui-theme-provider';
import {V1Theme} from '@versionone/ui-themes';
import TextField from '@versionone/ui/TextField';

export default () => {
    const theme = Object.assign({}, V1Theme, {
        _name: 'Test Theme',
        basicFontFamily: 'Arial',
        smallFontSize: 16,
        xxSmallGutter: 6,
        textPrimaryColor: 'blue',
        textSecondaryColor: 'green',
    });

    return (
        <ThemeProvider theme={theme}>
            <TextField
                required
                hintText="hint text"
            />
        </ThemeProvider>
    );
};
