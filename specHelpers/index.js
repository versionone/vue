import React from 'react';
import ThemeProvider, {getTheme} from './../src/Theme';

export const applyTheme = (ComponentUnderTest, theme = getTheme()) => <ThemeProvider theme={theme}>{ComponentUnderTest}</ThemeProvider>;
