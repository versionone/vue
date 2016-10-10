import getPropType from 'react-docgen/dist/utils/getPropType';
import getPropertyName from 'react-docgen/dist/utils/getPropertyName';
import getMemberValuePath from 'react-docgen/dist/utils/getMemberValuePath';
import isReactModuleName from 'react-docgen/dist/utils/isReactModuleName';
import isRequiredPropType from 'react-docgen/dist/utils/isRequiredPropType';
import printValue from 'react-docgen/dist/utils/printValue';
import recast from 'recast';
import resolveToModule from 'react-docgen/dist/utils/resolveToModule';
import resolveToValue from 'react-docgen/dist/utils/resolveToValue';

var {types: {namedTypes: types}} = recast;

const isPropTypesExpression = (path) => {
    var moduleName = resolveToModule(path);
    if (moduleName) {
        return isReactModuleName(moduleName) || moduleName === 'ReactPropTypes';
    }
    return false;
};

const amendPropTypes = (documentation, path)=> {
    if (!types.ObjectExpression.check(path.node)) {
        return;
    }
    path.get('properties').each(function(propertyPath) {
        switch (propertyPath.node.type) {
            case types.Property.name:
                var propDescriptor = documentation.getPropDescriptor(
                    getPropertyName(propertyPath)
                );
                var valuePath = propertyPath.get('value');
                var type = isPropTypesExpression(valuePath) ?
                    getPropType(valuePath) :
                {name: 'custom', raw: printValue(valuePath)};

                if (type) {
                    propDescriptor.type = type;
                    propDescriptor.required =
                        type.name !== 'custom' && isRequiredPropType(valuePath);
                }
                break;
            case types.SpreadProperty.name:
                var resolvedValuePath = resolveToValue(propertyPath.get('argument'));
                switch (resolvedValuePath.node.type) {
                    case types.ObjectExpression.name: // normal object literal
                        amendPropTypes(documentation, resolvedValuePath);
                        break;
                }
                break;
        }
    });
};

export default (documentation, path) => {
    var propTypesPath = getMemberValuePath(path, 'themePropTypes');
    if (!propTypesPath) {
        return;
    }
    propTypesPath = resolveToValue(propTypesPath);
    if (!propTypesPath) {
        return;
    }
    amendPropTypes(documentation, propTypesPath);
};