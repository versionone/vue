import getPropertyName from 'react-docgen/dist/utils/getPropertyName';
import getMemberValuePath from 'react-docgen/dist/utils/getMemberValuePath';
import printValue from 'react-docgen/dist/utils/printValue';
import recast from 'recast';
import resolveToValue from 'react-docgen/dist/utils/resolveToValue';

var {types: {namedTypes: types, visit}} = recast;

const getDefaultValue = (path) => {
    var node = path.node;
    var defaultValue;
    if (types.Literal.check(node)) {
        defaultValue = node.raw;
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

    if (types.FunctionExpression.check(defaultPropsPath.node)) {
        // Find the value that is returned from the function and process it if it is
        // an object literal.
        visit(defaultPropsPath.get('body'), {
            visitFunction: () => false,
            visitReturnStatement: function(path) {
                var resolvedPath = resolveToValue(path.get('argument'));
                if (types.ObjectExpression.check(resolvedPath.node)) {
                    defaultPropsPath = resolvedPath;
                }
                return false;
            }
        });
    }

    if (types.ObjectExpression.check(defaultPropsPath.node)) {
        defaultPropsPath.get('properties')
            .filter(propertyPath => types.Property.check(propertyPath.node))
            .forEach(function(propertyPath) {
                var propDescriptor = documentation.getPropDescriptor(
                    getPropertyName(propertyPath)
                );
                var defaultValue = getDefaultValue(propertyPath.get('value'));
                if (defaultValue) {
                    propDescriptor.defaultValue = defaultValue;
                }
            });
    }
};