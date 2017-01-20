import React from 'react';
import Button from 'vue/Button';

export default () => (
    <div>
        <span style={{margin: '1em'}}>
            <Button text="Standard Button" onClick={console.log} />
        </span>

        <span style={{margin: '1em'}}>
            <Button text="Disabled Button" disable onClick={console.log} />
        </span>
    </div>
);
