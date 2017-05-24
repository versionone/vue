import {componentType, deprecate, oneOfComponentType, origin, style, ZDepth} from '../../src/CustomPropTypes/index';
import componentTypePropType from '../../src/CustomPropTypes/componentType';
import deprecatedPropType from '../../src/CustomPropTypes/deprecated';
import oneOfComponentTypePropType from '../../src/CustomPropTypes/oneOfComponentType';
import originPropType from '../../src/CustomPropTypes/origin';
import stylePropType from '../../src/CustomPropTypes/style';

test('CustomProp types are exported', () => {
    expect(componentType).toEqual(componentTypePropType);
    expect(oneOfComponentType).toEqual(oneOfComponentTypePropType);
    expect(origin).toEqual(originPropType);
    expect(deprecate).toEqual(deprecatedPropType);
    expect(style).toEqual(stylePropType);
    expect(ZDepth).toBeDefined();
});
