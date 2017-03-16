'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ConfiguredRadium;

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfiguredRadium(component) {
    return (0, _radium2.default)({
        plugins: [_radium2.default.Plugins.mergeStyleArray, _radium2.default.Plugins.checkProps, _radium2.default.Plugins.resolveMediaQueries, _radium2.default.Plugins.resolveInteractionStyles, _radium2.default.Plugins.prefix, _radium2.default.Plugins.checkProps]
    })(component);
}