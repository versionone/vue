import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TextEntryField from './';

storiesOf('TextEntryField')
    .addWithInfo('long hint text',
        ``,
        () => (
            <TextEntryField hintText="hint text is super duper long, so long in fact, that it just may be unbelievable" />
        )
    )
    .addWithInfo('disabled',
        ``,
        () => (
            <TextEntryField hintText="hint text" disabled />
        )
    )
    .addWithInfo('required',
        ``,
        () => (
            <TextEntryField hintText="hint text" required />
        )
    )
    .addWithInfo('pending',
        ``,
        () => (
            <TextEntryField hintText="hint text" required pending />
        )
    )
    .addWithInfo('with value',
        ``,
        () => (
            <TextEntryField hintText="hint text" value="alpha-numeric!" />
        )
    );