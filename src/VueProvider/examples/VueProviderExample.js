import React from 'react';
import TextField from 'vue/TextField';
import VueProvider from 'vue/VueProvider';
import v1Theme from './../../styles/themes/v1Theme';

export default () => {
    const query = () => Promise.resolve([]);

    return (
        <VueProvider
            runQuery={query}
            theme={v1Theme}
        >
            <TextField
                hintText="hint text"
                required
            />
        </VueProvider>
    )
};
