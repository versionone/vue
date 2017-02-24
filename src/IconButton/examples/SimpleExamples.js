import React from 'react';
import IconButton from 'vue/IconButton';
import {CloseIcon} from 'vue/Icons';

export default () => (
    <div>
        <span style={{margin: '1em'}}>
            <IconButton icon={CloseIcon} />
        </span>

        <span style={{margin: '1em'}}>
            <IconButton  icon={CloseIcon} disable onClick={console.log} />
        </span>
    </div>
);
