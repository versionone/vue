import React from 'react';
import VueProvider from 'vue/VueProvider';
import Button from 'vue/Button';
import * as ButtonTypes from 'vue/Button/Types';

export default () => (
    <VueProvider>
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
    </VueProvider>
);
