const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const jsdom = require('jsdom').jsdom;
import initializeGlobalWindow from './specHelpers/initializeGlobalWindow';

chai.use(chaiEnzyme());
global.expect = chai.expect;
initializeGlobalWindow();
