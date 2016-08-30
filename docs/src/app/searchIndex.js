import lunr from 'lunr';

const index = lunr(function() {
    this.field('name', {boost: 10});
    this.field('keywords', {boost: 15});
    this.field('see also', {boost: -5});
    this.field('status');
    this.ref('name');
});

export default index;