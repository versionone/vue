import {componentType, deprecate, oneOfComponentType, origin, style, ZDepth} from './../';
import componentTypePropType from './../componentType';
import deprecatedPropType from './../deprecated';
import oneOfComponentTypePropType from './../oneOfComponentType';
import originPropType from './../origin';
import stylePropType from './../style';

test('CustomProp types are exported', () => {
    expect(componentType).toEqual(componentTypePropType);
    expect(oneOfComponentType).toEqual(oneOfComponentTypePropType);
    expect(origin).toEqual(originPropType);
    expect(deprecate).toEqual(deprecatedPropType);
    expect(style).toEqual(stylePropType);
    expect(ZDepth).toBeDefined();
});
