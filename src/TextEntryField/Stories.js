import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TextEntryField from './';

storiesOf('TextEntryField')
    .addWithInfo('long hint text',
        ``,
        () => (
            <TextEntryField hintText="hint text is super duper long, so long in fact, that it just may be unbelievable" required />
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
    .addWithInfo('invalid',
        ``,
        () => (
            <TextEntryField hintText="hint text" required errorText="required field" />
        )
    )
    .addWithInfo('full width',
        ``,
        () => (
            <TextEntryField fullWidth hintText="hint text" required errorText="required field" />
        )
    )
    .addWithInfo('stacked',
        ``,
        () => (<div>
                <div style={{marginBottom: '16px'}}>
                    <TextEntryField hintText="hint text" required
                                    errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
                <div style={{marginBottom: '16px'}}>
                    <TextEntryField
                        hintText="hint text is super duper long, so long in fact, that it just may be unbelievable"
                        required
                        errorText="this field is of the utmost importance and, therefore, is required" /></div>
                <div>
                    <TextEntryField hintText="hint text" required
                                    errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
            </div>
        )
    )
    .addWithInfo('with value',
        ``,
        () => (
            <TextEntryField hintText="hint text" value="alpha-numeric!" />
        )
    );