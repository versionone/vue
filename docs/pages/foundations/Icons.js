import React from 'react';
import Title from 'react-title-component';
import iconsReadme from './icons.md';
import MarkdownElement from 'vue-docs/MarkdownElement';
import * as Icons from 'vue/Icons';

const alphabeticalOrder = polarity => (iconName1, iconName2) => {
    if (polarity) {
        return iconName1 - iconName2;
    }
    return iconName2 - iconName1;
};

const icons = Object.keys(Icons)
    .sort(alphabeticalOrder(true))
    .map(key => ({
        Component: Icons[key],
        name: key
    }));

const IconsPage = () => (
    <div>
        <Title
            render={previousTitle => `Icons - ${previousTitle}`}
        />
        <MarkdownElement text={iconsReadme} />
        <ul
            style={{listStyle: 'none'}}
        >
            {icons.map((icon, iconIndex) => (
                <li
                    key={iconIndex}
                    style={{
                        border: '1px solid #000',
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        height: '85px',
                        margin: '4px',
                        padding: '4px',
                        textAlign: 'center',
                        width: '85px'
                    }}
                >
                    <span
                        style={{display: 'block'}}
                    >{icon.name}</span>
                    <icon.Component width={48} />
                </li>
            ))}
        </ul>
    </div>
);
IconsPage.displayName = 'IconsPage';
export default IconsPage;
