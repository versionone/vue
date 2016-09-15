import React from 'react';
import ThemeProvider, {getTheme} from './../src/Theme';

export const applyTheme = (ComponentUnderTest, theme) => <ThemeProvider theme={getTheme(theme)}>{ComponentUnderTest}</ThemeProvider>;
