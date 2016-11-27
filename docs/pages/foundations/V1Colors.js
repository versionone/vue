import React from 'react';
import Title from 'react-title-component';
import ColorSwatch from './../../src/app/components/ColorSwatch';
import * as spectrumColors from 'vue/styles/Colors/spectrum';

const colorValueStartIndex = 1;
const colorSpectrumSort = (color1, color2) => {
    const color1Value = parseInt(color1.value.substr(colorValueStartIndex), 16);
    const color2Value = parseInt(color2.value.substr(colorValueStartIndex), 16);
    return color1Value > color2Value;
};

const colors = Object.keys(spectrumColors)
    .map(colorKey => ({
        name: colorKey,
        value: spectrumColors[colorKey]
    }))
    .sort(colorSpectrumSort);

const ColorsPage = () => (
    <div>
        <Title render={previousTitle => `V1 Colors - ${previousTitle}`} />
        <h2>Spectrum Colors</h2>
        <div
            style={{
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
            }}
        >
            {colors.map((color, colorIndex) => (
                <div
                    key={colorIndex}
                    style={{
                        boxSizing: 'border-box',
                        display: 'inline-flex',
                        height: '200px',
                        margin: '14px',
                        width: '25%'
                    }}
                >
                    <ColorSwatch
                        name={color.name}
                        value={color.value}
                    />
                </div>
            ))}
        </div>
    </div>
);
ColorsPage.displayName = 'ColorsPage';
export default ColorsPage;
