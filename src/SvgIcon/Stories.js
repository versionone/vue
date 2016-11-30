import React from 'react';
import {storiesOf} from '@kadira/storybook';
import SvgIcon from './';
import AddIcon from './../Icons/Add';

storiesOf('SvgIcon')
    .addWithInfo('custom add svg icon',
        ``,
        () => (
            <SvgIcon>
                <path
                    d="M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M17,13h-4.1v3.9h-2V13H7v-2h3.9V6.9h2V11H17V13z"
                />
            </SvgIcon>
        )
    )
    .addWithInfo('AddIcon',
        ``,
        () => (
            <AddIcon />
        )
    )
    .addWithInfo('AddIcon with custom props',
        ``,
        () => (
            <AddIcon
                color="green"
                hoverColor="blue"
                width={50}
            />
        )
    );
