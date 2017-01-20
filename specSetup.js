const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const jsdom = require('jsdom').jsdom;

chai.use(chaiEnzyme());
global.expect = chai.expect;

const exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
    userAgent: 'node.js'
};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});
