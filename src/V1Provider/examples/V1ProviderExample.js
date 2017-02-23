import React from 'react';
import V1Provider from 'vue/V1Provider';
import AssetLookup from 'vue/Lookup/AssetLookup';

export default () => {
    const runQuery = (query) => Promise.resolve([
        {
            Oid: 'Team:1',
            Name: 'Imua',
        }
    ]);

    return (
        <V1Provider runQuery={runQuery}>
            <AssetLookup
                dataSourceConfig={{
                    oidKey: 'Oid',
                    renderItem: (item) => item.Name,
                    text: 'Name',
                }}
                hintText="hint text"
                query={{
                    from: 'Team',
                    select: ['Name', 'Oid']
                }}
                resultGroups="All Results"
            />
        </V1Provider>
    )
};
