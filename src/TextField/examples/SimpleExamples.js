import React from 'react';
import TextField from 'vue/TextField';

export default () => (
    <div>
        <TextField hintText="hint text" />
        <br/><br/>
        <TextField hintText="hint text can be as long as you want it to be" />
        <br/><br/>
        <TextField hintText="hint text" defaultValue="Default Value" />
        <br/><br/>
        <TextField hintText="disabled" disabled />
        <br/><br/>
        <TextField hintText="pending" pending />
        <br/><br/>
        <TextField hintText="full width" fullWidth />
    </div>
);