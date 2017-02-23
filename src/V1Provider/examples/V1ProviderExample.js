import React from 'react';
import V1Provider from 'vue/V1Provider';
import AssetLookup from 'vue/AssetLookup';

export default () => {
    const v1Sdk = {
        query: (query) => Promise.resolve([]),
    };

    return (
        <V1Provider v1={v1Sdk}>
            <AssetLookup
                dataSourceConfig={{
                    oidKey: 'Oid',
                    render: (item) => item.Name,
                    text: 'Name',
                }}
                hintText="hint text"
                query={{
                    from: 'Team',
                    select: ['Name', 'Oid']
                }}
            />
        </V1Provider>
    )
};
