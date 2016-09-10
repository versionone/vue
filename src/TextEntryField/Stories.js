import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TextEntryField from './';

storiesOf('TextEntryField')
    .addWithInfo('no value, long hint',
        ``,
        () => (
            <TextEntryField hintText="placeholder text that is a really long hint text" />
        )
    )
    .addWithInfo('with value',
        ``,
        () => (
            <TextEntryField value="alpha-numeric!" />
        )
    );