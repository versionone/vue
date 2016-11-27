import React from 'react';
import Title from 'react-title-component';
import v1DefaultTheme from 'vue/styles/themes/v1Theme';
import ThemeDescription from './../../src/app/components/ThemeConfigurationDescription';

const themeProviderCode = require('!raw!./../../../src/Theme/ThemeProvider');

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
