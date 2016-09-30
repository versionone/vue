import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TextField from './';

storiesOf('TextEntryField')
    .addWithInfo('with value',
        ``,
        () => (
            <TextField hintText="hint text" value="no typing can change me!" />
        )
    )
    .addWithInfo('without value & default Value',
        ``,
        () => (
            <TextField hintText="hint text" defaultValue="alpha-numeric!" />
        )
    )
    .addWithInfo('long hint text',
        ``,
        () => (
            <TextField hintText="hint text is super duper long, so long in fact, that it just may be unbelievable" required />
        )
    )
    .addWithInfo('disabled',
        ``,
        () => (
            <TextField hintText="hint text" disabled />
        )
    )
    .addWithInfo('required',
        ``,
        () => (
            <TextField hintText="hint text" required />
        )
    )
    .addWithInfo('pending',
        ``,
        () => (
            <TextField hintText="hint text" required pending />
        )
    )
    .addWithInfo('invalid',
        ``,
        () => (
            <TextField hintText="hint text" required errorText="required field" />
        )
    )
    .addWithInfo('full width',
        ``,
        () => (
            <TextField fullWidth hintText="hint text" required errorText="required field" />
        )
    )
    .addWithInfo('stacked',
        ``,
        () => (<div>
                <div style={{marginBottom: '16px'}}>
                    <TextField hintText="hint text" required
                               errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
                <div style={{marginBottom: '16px'}}>
                    <TextField
                        hintText="hint text is super duper long, so long in fact, that it just may be unbelievable"
                        required
                        errorText="this field is of the utmost importance and, therefore, is required" /></div>
                <div>
                    <TextField hintText="hint text" required
                               errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
            </div>
        )
    );