import getPropertyName from 'react-docgen/dist/utils/getPropertyName';
import getMemberValuePath from 'react-docgen/dist/utils/getMemberValuePath';
import printValue from 'react-docgen/dist/utils/printValue';
import recast from 'recast';
import resolveToValue from 'react-docgen/dist/utils/resolveToValue';

var {types: {namedTypes: types, visit}} = recast;

const getDefaultValue = (path, documentation) => {
    var node = path.node;
    var defaultValue;
    if (types.Literal.check(node)) {
        defaultValue = node.raw;
    } else if (types.ObjectExpression.check(node)) {
        return path.get('properties')
            .filter(propertyPath => types.Property.check(propertyPath.node))
            .map(function(propertyPath) {
                const name = getPropertyName(propertyPath);
                var defaultValue = getDefaultValue(propertyPath.get('value'));
                return {
                    name,
                    defaultValue
                };
            })
            .reduce((output, themeProp) => ({...output, [themeProp.name]: themeProp.defaultValue}), {});
    } else {
        path = resolveToValue(path);
        if (types.ImportDeclaration.check(path.node)) {
            defaultValue = node.name;
        } else {
            node = path.node;
            defaultValue = printValue(path);
        }
    }
    if (typeof defaultValue !== 'undefined') {
        return {
            value: defaultValue,
            computed: types.CallExpression.check(node) ||
            types.MemberExpression.check(node) ||
            types.Identifier.check(node)
        };
    }
};

export default (documentation, path) => {
    var defaultPropsPath = getMemberValuePath(path, 'defaultThemeProps');
    if (!defaultPropsPath) {
        return;
    }

    defaultPropsPath = resolveToValue(defaultPropsPath);
    if (!defaultPropsPath) {
        return;
    }

    if (types.ObjectExpression.check(defaultPropsPath.node)) {
        defaultPropsPath.get('properties')
            .filter(propertyPath => types.Property.check(propertyPath.node))
            .forEach(function(propertyPath) {
                var propDescriptor = documentation.getPropDescriptor(
                    getPropertyName(propertyPath)
                );
                var values = getDefaultValue(propertyPath.get('value'), documentation);
                if (values) {
                    propDescriptor.values = values;
                }
            });
    }
};