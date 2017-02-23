import React from 'react';
import TextField from 'vue/TextField';
import v1Theme from './../../styles/themes/v1Theme';

export default () => {
    const v1 = {
        query: () => Promise.resolve([]),
    };

    return (
        <VueProvider
            theme={v1Theme}
            v1={v1}
        >
            <TextField
                hintText="hint text"
                required
            />
        </VueProvider>
    )
};
