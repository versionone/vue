import lunr from 'lunr';
import unique from 'uniqueid';
const getUniqueSearchId = unique();
let dataStore = {};

const indexData = lunr(function() {
    this.field('title', {boost: 10});
    this.field('keywords', {boost: 15});
    this.field('status');
    this.ref('id');
});

export const index = (path, meta = {}) => {
    const id = getUniqueSearchId();
    const dataWithId = {title: meta.name, ...meta, id, path};
    indexData.add(dataWithId);
    dataStore = {
        ...dataStore,
        [id]: dataWithId
    };
};

export const search = (searchTerm) => indexData.search(searchTerm)
    .sort((a, b) => a.score - b.score)
    .map((result) => dataStore[result.ref]);
