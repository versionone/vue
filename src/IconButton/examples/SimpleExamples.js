import React from 'react';
import IconButton from '@versionone/ui/IconButton';
import VersionOneUIProvider from '@versionone/ui/VersionOneUIProvider';
import {CloseIcon} from '@versionone/ui/Icons';

export default () => (
    <VersionOneUIProvider>
        <div>
        <span style={{margin: '1em'}}>
            <IconButton icon={CloseIcon} />
        </span>

            <span style={{margin: '1em'}}>
            <IconButton icon={CloseIcon} disable onClick={console.log} />
        </span>
        </div>
    </VersionOneUIProvider>
);
