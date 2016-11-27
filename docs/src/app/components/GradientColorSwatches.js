import React, {PropTypes} from 'react';
import ColorSwatch from './ColorSwatch';
import {darken, lighten} from 'vue/utilities/colorManipulator';

const lighterCoefficient = 0.45;
const lighestCoefficient = 0.80;

const darkerCoefficient = 0.15;
const darkestCoefficient = 0.35;

const GradientColorSwatches = ({name, value}) => (
    <ol
        style={{
            listStyle: 'none',
            margin: '0px',
            padding: '0px'
        }}
    >
        <li>
            <ColorSwatch
                name={`lightest ${name}`}
                value={lighten(value, lighestCoefficient)}
            />
        </li>
        <li>
            <ColorSwatch
                name={`lighter ${name}`}
                value={lighten(value, lighterCoefficient)}
            />
        </li>
        <li>
            <ColorSwatch
                name={name}
                value={value}
            />
        </li>
        <li>
            <ColorSwatch
                name={`darker ${name}`}
                value={darken(value, darkerCoefficient)}
            />
        </li>
        <li>
            <ColorSwatch
                name={`darkest ${name}`}
                value={darken(value, darkestCoefficient)}
            />
        </li>
    </ol>
);
GradientColorSwatches.displayName = 'GradientColorSwatches';
GradientColorSwatches.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};
export default GradientColorSwatches;
