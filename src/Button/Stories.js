import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import CloseIcon from './../Icons/CloseIcon';
import Button, {IconButton} from './';
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

storiesOf('IconButton')
    .addWithInfo('hover colors',
        '',
        () => (
            <IconButton
                icon={CloseIcon}
                backgroundColor="white"
                color="blue"
                hoverBackgroundColor="blue"
                hoverColor="white"
                onClick={action('clicked')}
            />
        )
    )
    .addWithInfo('circular',
        '',
        () => (
            <IconButton
                backgroundColor="blue"
                circle
                color="white"
                hoverBackgroundColor="white"
                hoverColor="blue"
                icon={CloseIcon}
                size={ButtonSizes.small}
                onClick={action('clicked')}
            />
        )
    )
    .addWithInfo('border',
        '',
        () => (
            <div>
                <IconButton
                    icon={CloseIcon}
                    backgroundColor="white"
                    border="1px solid green"
                    color="blue"
                    hoverBackgroundColor="blue"
                    hoverColor="white"
                    onClick={action('clicked')}
                />
                <IconButton
                    backgroundColor="white"
                    border="1px solid green"
                    circle
                    color="blue"
                    hoverBackgroundColor="blue"
                    hoverColor="white"
                    icon={CloseIcon}
                    size={ButtonSizes.small}
                    onClick={action('clicked')}
                />
            </div>
        )
    )
    .addWithInfo('disabled',
        '',
        () => (
            <div>
                <div>
                    <h2>With Background colors</h2>
                    <IconButton
                        backgroundColor="white"
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                    <IconButton
                        backgroundColor="white"
                        border="blue"
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                    <IconButton
                        backgroundColor="white"
                        circle
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                    <IconButton
                        backgroundColor="white"
                        border="blue"
                        circle
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                </div>
                <div>
                    <h2>Without Background colors</h2>
                    <IconButton
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                    <IconButton
                        border="blue"
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                    <IconButton
                        circle
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                    <IconButton
                        border="blue"
                        circle
                        disabled
                        hoverBackgroundColor="blue"
                        hoverColor="white"
                        icon={CloseIcon}
                        onClick={action('clicked')}
                    />
                </div>
            </div>
        )
    )
    .addWithInfo('resizing',
        '',
        () => (
            <div>
                <IconButton disabled icon={CloseIcon} size={ButtonSizes.small} onClick={action('clicked')} />
                <IconButton disabled icon={CloseIcon} size={ButtonSizes.normal} onClick={action('clicked')} />
                <IconButton disabled icon={CloseIcon} size={ButtonSizes.large} onClick={action('clicked')} />
            </div>
        )
    );
