import React from 'react';
import {action, storiesOf} from '@kadira/storybook';
import CloseIcon from './../Icons/CloseIcon';
import IconButton from './';

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
                    border="10px solid green"
                    color="blue"
                    hoverBackgroundColor="blue"
                    hoverColor="white"
                    onClick={action('clicked')}
                />
                <IconButton
                    backgroundColor="white"
                    border="10px solid green"
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
