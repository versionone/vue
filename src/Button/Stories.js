import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import Button from './';
import * as ButtonSizes from './Sizes';
import * as ButtonTypes from './Types';

storiesOf('Button')
    .addWithInfo('empty/blank',
        '',
        () => (
            <Button onClick={action('clicked')} />
        )
    )
    .addWithInfo('types',
        '',
        () => (
            <div>
                <Button text="Default is Standard" type={ButtonTypes.standard} onClick={action('clicked')} />
                <Button text="Standard" type={ButtonTypes.standard} onClick={action('clicked')} />
                <Button text="Important" type={ButtonTypes.important} onClick={action('clicked')} />
                <Button text="Basic" type={ButtonTypes.basic} onClick={action('clicked')} />
                <Button text="Alternative" type={ButtonTypes.alt} onClick={action('clicked')} />
                <Button text="Basic Alternative" type={ButtonTypes.basicAlt} onClick={action('clicked')} />
                <Button text="Special" type={ButtonTypes.special} onClick={action('clicked')} />
            </div>
        )
    )
    .addWithInfo('disabled buttons',
        '',
        () => (
            <div>
                <Button disabled text="Default is Standard" type={ButtonTypes.standard} onClick={action('clicked')} />
                <Button disabled text="Standard" type={ButtonTypes.standard} onClick={action('clicked')} />
                <Button disabled text="Important" type={ButtonTypes.important} onClick={action('clicked')} />
                <Button disabled text="Basic" type={ButtonTypes.basic} onClick={action('clicked')} />
                <Button disabled text="Alternative" type={ButtonTypes.alt} onClick={action('clicked')} />
                <Button disabled text="Basic Alternative" type={ButtonTypes.basicAlt} onClick={action('clicked')} />
                <Button disabled text="Special" type={ButtonTypes.special} onClick={action('clicked')} />
            </div>
        )
    )
    .addWithInfo('resizing',
        '',
        () => (
            <div>
                <section>
                    <Button text="Standard" size={ButtonSizes.small} />
                    <Button text="Standard" size={ButtonSizes.normal} />
                    <Button text="Standard" size={ButtonSizes.large} />
                </section>
                <section>
                    <Button text="Important" size={ButtonSizes.small} type={ButtonTypes.important} />
                    <Button text="Important" size={ButtonSizes.normal} type={ButtonTypes.important} />
                    <Button text="Important" size={ButtonSizes.large} type={ButtonTypes.important} />
                </section>
                <section>
                    <Button text="Basic" size={ButtonSizes.small} type={ButtonTypes.basic} />
                    <Button text="Basic" size={ButtonSizes.normal} type={ButtonTypes.basic} />
                    <Button text="Basic" size={ButtonSizes.large} type={ButtonTypes.basic} />
                </section>
                <section>
                    <Button text="Alternative" size={ButtonSizes.small} type={ButtonTypes.alt} />
                    <Button text="Alternative" size={ButtonSizes.normal} type={ButtonTypes.alt} />
                    <Button text="Alternative" size={ButtonSizes.large} type={ButtonTypes.alt} />
                </section>
                <section>
                    <Button text="Basic Alternative" size={ButtonSizes.small} type={ButtonTypes.basicAlt} />
                    <Button text="Basic Alternative" size={ButtonSizes.normal} type={ButtonTypes.basicAlt} />
                    <Button text="Basic Alternative" size={ButtonSizes.large} type={ButtonTypes.basicAlt} />
                </section>
                <section>
                    <Button text="Special" size={ButtonSizes.small} type={ButtonTypes.special} />
                    <Button text="Special" size={ButtonSizes.normal} type={ButtonTypes.special} />
                    <Button text="Special" size={ButtonSizes.large} type={ButtonTypes.special} />
                </section>
            </div>
        )
    );
