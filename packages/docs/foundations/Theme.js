import React from 'react';
import ThemeDescription from './../../src/app/components/ThemeConfigurationDescription';
import v1DefaultTheme from './../../../src/styles/themes/V1Theme';

const themeProviderCode = require('!raw!./../../../src/ThemeProvider/ThemeProvider');

const ThemePage = () => (
    <ThemeDescription
        code={themeProviderCode}
        themes={[v1DefaultTheme]}
    />
);

export const title = 'Theme';
export const status = 'draft';
export const keywords = [
    'style',
    'css',
    'less',
    'scss',
    'sass',
    'visual',
    'guide',
    'stylesheet',
];
export const component = ThemePage;

