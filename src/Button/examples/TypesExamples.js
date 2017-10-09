import React from 'react';
import Button from '@versionone/ui/Button';
import * as ButtonTypes from '@versionone/ui/Button/Types';

export default () => (
    <div>
        <span style={{margin: '1em'}}>
            <Button text="Standard Button" onClick={console.log} />
        </span>

        <span style={{margin: '1em'}}>
            <Button text="Basic Button" type={ButtonTypes.basic} onClick={console.log} />
        </span>

        <span style={{margin: '1em'}}>
            <Button text="Important Button" type={ButtonTypes.important} onClick={console.log} />
        </span>

        <span style={{margin: '1em'}}>
            <Button text="Alt Button" type={ButtonTypes.alt} onClick={console.log} />
        </span>

        <span style={{margin: '1em'}}>
            <Button text="Basic Alt Button" type={ButtonTypes.basicAlt} onClick={console.log} />
        </span>

        <span style={{margin: '1em'}}>
            <Button text="Special Button" type={ButtonTypes.special} onClick={console.log} />
        </span>
    </div>
);
