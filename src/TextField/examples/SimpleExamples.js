import React from 'react';
import TextField from 'vue/ExpectedTextField';

export default () => (
    <div>
        <TextField hintText="hint text" />
        <br/><br/>
        <TextField hintText="hint text can be as long as you want, even if it is longer than the width of the TextField" />
        <br/><br/>
        <TextField hintText="hint text" defaultValue="default value" />
        <br/><br/>
        <TextField hintText="disabled" disabled />
        <br/><br/>
        <TextField hintText="pending" pending />
        <br/><br/>
        <TextField hintText="full width" fullWidth />
    </div>
);
