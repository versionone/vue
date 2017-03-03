import React from 'react';
import Title from 'react-title-component';
import ThemeDescription from './../../src/app/components/ThemeConfigurationDescription';
import v1DefaultTheme from './../../../src/styles/themes/v1Theme';

const themeProviderCode = require('!raw!./../../../src/ThemeProvider/ThemeProvider');

const ThemePage = () => (
    <div>
        <Title render={previousTitle => `Themes - ${previousTitle}`} />
        <ThemeDescription
            code={themeProviderCode}
            themes={[v1DefaultTheme]}
        />
    </div>
);
ThemePage.displayName = 'ThemePage';
export default ThemePage;
