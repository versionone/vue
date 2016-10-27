import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TextField from './';

storiesOf('TextField')
    .addWithInfo('explicit value',
        ``,
        () => (
            <TextField value="explicitly set value" />
        )
    )
    .addWithInfo('default value only',
        ``,
        () => (
            <TextField defaultValue="default value" />
        )
    )
    .addWithInfo('hint text',
        ``,
        () => (
            <TextField hintText="hint text" />
        )
    )
    .addWithInfo('long hint text',
        ``,
        () => (
            <TextField
                hintText="hint text. This hint text is not just lengthy, but absurdly long. Why would anyone do this anyway?" />
        )
    )
    .addWithInfo('long hint text; required',
        ``,
        () => (
            <TextField
                hintText="hint text. This hint text is not just lengthy, but absurdly long. Why would anyone do this anyway?"
                required />
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
            <TextField hintText="hint text" pending />
        )
    )
    .addWithInfo('invalid',
        ``,
        () => (
            <TextField hintText="hint text" required errorText="error text" />
        )
    )
    .addWithInfo('full width',
        ``,
        () => (
            <TextField fullWidth hintText="hint text" />
        )
    )
    .addWithInfo('full width; required',
        ``,
        () => (
            <TextField fullWidth hintText="hint text" required />
        )
    )
    .addWithInfo('full width; invalid',
        ``,
        () => (
            <TextField fullWidth hintText="hint text" errorText="error text" />
        )
    )
    .addWithInfo('stacked',
        ``,
        () => (
            <div>
                <div style={{marginBottom: '16px'}}>
                    <TextField hintText="hint text" required
                               errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
                <div style={{marginBottom: '16px'}}>
                    <TextField
                        hintText="hint text is super duper long, so long in fact, that it just may be unbelievable"
                        required
                        errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
                <div style={{marginBottom: '16px'}}>
                    <TextField
                        hintText="hint text is super duper long, so long in fact, that it just may be unbelievable"
                        required
                        errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
                <div>
                    <TextField hintText="hint text" required
                               errorText="this field is of the utmost importance and, therefore, is required" />
                </div>
            </div>
        )
    );