import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Button from './';
import * as ButtonSizes from './Sizes';
import * as ButtonTypes from './Types';

storiesOf('Button')
    .addWithInfo('empty/blank',
        `Button with no text or content`,
        () => (
            <Button />
        )
    )
    .addWithInfo('standard button',
        `Buttons default to a standard type`,
        () => (
            <Button text="Click Me" type={ButtonTypes.standard} />
        )
    )
    .addWithInfo('small, normal, large standard buttons',
        `size is a numeric value that will scale the button by times the size's specified amount`,
        () => (
            <div>
                <Button text="Click Me" size={ButtonSizes.small} />
                <Button text="Click Me" type={ButtonSizes.normal} />
                <Button text="Click Me" type={ButtonSizes.large} />
            </div>
        )
    )
    .addWithInfo('basic button type',
        ``,
        () => (
            <Button text="Click Me" type={ButtonTypes.basic} />
        )
    );
