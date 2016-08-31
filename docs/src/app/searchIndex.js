import lunr from 'lunr';
import unique from 'uniqueid';
const getUniqueSearchId = unique();
let dataStore = {};

const indexData = lunr(function() {
    this.field('name', {boost: 10});
    this.field('keywords', {boost: 15});
    this.field('see also', {boost: -5});
    this.field('status');
    this.ref('id');
});

export const index = (path, page) => {
    const id = getUniqueSearchId();
    const dataWithId = {...page.meta, id, path};
    indexData.add(dataWithId);
    dataStore = {
        ...dataStore,
        [id]: dataWithId
    };
    return page.default;
};

export const search = (searchTerm) => indexData.search(searchTerm)
    .sort((a, b) => a.score - b.score)
    .map((result) => dataStore[result.ref]);
