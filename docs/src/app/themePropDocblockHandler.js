import getMemberValuePath from 'react-docgen/dist/utils/getMemberValuePath';
import recast from 'recast';
import resolveToValue from 'react-docgen/dist/utils/resolveToValue';
import setPropDescription from 'react-docgen/dist/utils/setPropDescription';

var {types: {namedTypes: types}} = recast;

export default (documentation, path)=> {
    var propTypesPath = getMemberValuePath(path, 'themePropTypes');
    if (!propTypesPath) {
        return;
    }
    propTypesPath = resolveToValue(propTypesPath);
    if (!propTypesPath || !types.ObjectExpression.check(propTypesPath.node)) {
        return;
    }

    propTypesPath.get('properties').each(propertyPath => {
        // we only support documentation of actual properties, not spread
        if (types.Property.check(propertyPath.node)) {
            setPropDescription(documentation, propertyPath);
        }
    });
};

