import React from 'react';
import TextField from '@versionone/ui/TextField';
import VersionOneUIProvider from '@versionone/ui/VersionOneUIProvider';
import v1Theme from './../../styles/themes/v1Theme';

export default () => {
    const query = () => Promise.resolve([]);

    return (
        <VersionOneUIProvider
            runQuery={query}
            theme={v1Theme}
        >
            <TextField
                hintText="hint text"
                required
            />
        </VersionOneUIProvider>
    )
};
