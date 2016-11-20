import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import Button from './';
import * as ButtonSizes from './Sizes';
import * as ButtonTypes from './Types';

storiesOf('Button')
    .addWithInfo('empty/blank',
        `Button with no text or content`,
        () => (
            <Button onClick={action('clicked')} />
        )
    )
    .addWithInfo('standard button',
        `Buttons default to a standard type`,
        () => (
            <Button text="Click Me" type={ButtonTypes.standard} onClick={action('clicked')} />
        )
    )
    .addWithInfo('small, normal, large standard buttons',
        `size is a numeric value that will scale the button by times the size's specified amount`,
        () => (
            <div>
                <section>
                    <h1>Standard Buttons</h1>
                    <Button text="Click Me" size={ButtonSizes.small} />
                    <Button text="Click Me" size={ButtonSizes.normal} />
                    <Button text="Click Me" size={ButtonSizes.large} />
                </section>
                <section>
                    <h1>Basic Buttons</h1>
                    <Button text="Click Me" size={ButtonSizes.small} type={ButtonTypes.basic} />
                    <Button text="Click Me" size={ButtonSizes.normal} type={ButtonTypes.basic} />
                    <Button text="Click Me" size={ButtonSizes.large} type={ButtonTypes.basic} />
                </section>
                <section>
                    <h1>Important Buttons</h1>
                    <Button text="Click Me" size={ButtonSizes.small} type={ButtonTypes.important} />
                    <Button text="Click Me" size={ButtonSizes.normal} type={ButtonTypes.important} />
                    <Button text="Click Me" size={ButtonSizes.large} type={ButtonTypes.important} />
                </section>
                <section>
                    <h1>Alt Buttons</h1>
                    <Button text="Click Me" size={ButtonSizes.small} type={ButtonTypes.alt} />
                    <Button text="Click Me" size={ButtonSizes.normal} type={ButtonTypes.alt} />
                    <Button text="Click Me" size={ButtonSizes.large} type={ButtonTypes.alt} />
                </section>
                <section>
                    <h1>Basic Alt Buttons</h1>
                    <Button text="Click Me" size={ButtonSizes.small} type={ButtonTypes.basicAlt} />
                    <Button text="Click Me" size={ButtonSizes.normal} type={ButtonTypes.basicAlt} />
                    <Button text="Click Me" size={ButtonSizes.large} type={ButtonTypes.basicAlt} />
                </section>
                <section>
                    <h1>Special Buttons</h1>
                    <Button text="Click Me" size={ButtonSizes.small} type={ButtonTypes.special} />
                    <Button text="Click Me" size={ButtonSizes.normal} type={ButtonTypes.special} />
                    <Button text="Click Me" size={ButtonSizes.large} type={ButtonTypes.special} />
                </section>
            </div>
        )
    )
    .addWithInfo('basic button',
        ``,
        () => (
            <Button text="Click Me" type={ButtonTypes.basic} onClick={action('clicked')} />
        )
    )
    .addWithInfo('important button',
        ``,
        () => (
            <Button text="Click Me" type={ButtonTypes.important} onClick={action('clicked')} />
        )
    )
    .addWithInfo('alternative button',
        ``,
        () => (
            <Button text="Click Me" type={ButtonTypes.alt} onClick={action('clicked')} />
        )
    )
    .addWithInfo('basic alternative button',
        ``,
        () => (
            <Button text="Click Me" type={ButtonTypes.basicAlt} onClick={action('clicked')} />
        )
    )
    .addWithInfo('special button',
        ``,
        () => (
            <Button text="Click Me" type={ButtonTypes.special} onClick={action('clicked')} />
        )
    )
    .addWithInfo('disabled buttons',
        ``,
        () => (
            <div>
                <section>
                    <h1>Standard Buttons</h1>
                    <Button text="Click Me" disable onClick={action('clicked')} />
                </section>
                <section>
                    <h1>Basic Buttons</h1>
                    <Button text="Click Me" disable type={ButtonTypes.basic} onClick={action('clicked')} />
                </section>
                <section>
                    <h1>Important Buttons</h1>
                    <Button text="Click Me" disable type={ButtonTypes.important} onClick={action('clicked')} />
                </section>
                <section>
                    <h1>Alt Buttons</h1>
                    <Button text="Click Me" disable type={ButtonTypes.alt} onClick={action('clicked')} />
                </section>
                <section>
                    <h1>Basic Alt Buttons</h1>
                    <Button text="Click Me" disable type={ButtonTypes.basicAlt} onClick={action('clicked')} />
                </section>
                <section>
                    <h1>Special Buttons</h1>
                    <Button text="Click Me" disable type={ButtonTypes.special} onClick={action('clicked')} />
                </section>
            </div>
        )
    );
