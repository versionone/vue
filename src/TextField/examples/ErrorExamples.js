import React from 'react';
import TextField from 'vue/ExpectedTextField';

export default () => (
    <div>
        <TextField hintText="required text field" required />
        <br/><br/>
        <TextField hintText="with error text" errorText="error text" />
        <br/><br/>
        <TextField hintText="full width required with error text" fullWidth required errorText="error text" />
    </div>
);
