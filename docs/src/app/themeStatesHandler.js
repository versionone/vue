import getMemberValuePath from 'react-docgen/dist/utils/getMemberValuePath';
import recast from 'recast';
import resolveToValue from 'react-docgen/dist/utils/resolveToValue';

var {types: {namedTypes: types}} = recast;

const addThemeStates = (documentation, path) => {
    if (!types.ArrayExpression.check(path.node)) {
        return;
    }
    documentation.set('themedStates', path.value.elements.map((element) => element.rawValue));
};

export default (documentation, path) => {
    var propTypesPath = getMemberValuePath(path, 'themedStates');
    if (!propTypesPath) {
        return;
    }
    propTypesPath = resolveToValue(propTypesPath);
    if (!propTypesPath) {
        return;
    }
    addThemeStates(documentation, propTypesPath);
};