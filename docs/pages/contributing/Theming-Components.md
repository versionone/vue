---
title: Theming Components
menuCategory: Contributing
status: stable
keywords:
  - style
  - css
  - less
  - scss
  - sass
  - visual
  - guide
  - stylesheet
  ---

This guide will provide all the details necessary to theme a component. This includes how to create a theme-enabled component, as well as the general process in which theming occurs.

## TL;DR

1. [What is meant by a "theme?"](#what-is-a-theme)
1. [How Theming Works](#how-theming-works)
2. [Enable Theming in a Component](#enable-theming-components)

## What is a Theme? <a name="what-is-a-theme"></a>
Themes are not styles and should not be thought of as styles. In fact, there are theming options that are purposefully named things that do not coincide with a style. An example is the text color; named `textColor` instead of `color`. Instead of a set of styles, a theme is meant to be a set of options that represent how a component may be visually configured as a whole, single unit. Themes operate on a few core concepts; detailed further below:

1. Never break a component's isolation
2. Components should "just work" as expected
3. Components can function without a theme or external styles

### Do not Break Component Isolation
Most components will internally be a tree of DOM. However, direct styling or style props for each element breaks the isolation of the component. It means that, externally, we must have some knowledge of the internals of the component in order to apply styles. Instead, we want to treat every component as a single, whole unit and not a tree of internal markup. This exposes a problem: how do you style internal elements without knowing about them externally?

### Components Should "Just Work"
In alignment with the previous point, components should not require external factors to render and function properly. Additionally, external factors should not be capable of "high-jacking" the visuals or functionality of a component. In other words, external stylesheets should **not** be capable of overriding a component's styles; by design. This makes the use of inline styles a good fit. However, if components' styles cannot be overridden, how do you override a component's visuals?

### Solution: Themes
If we are thinking of components as single, whole units, then we should also be thinking about their visuals from the same perspective. Every component should have configurable options that tell the component, as a unit, how to render and look visually. The externalization of these configuration options is a theme. Therefore, a theme is

> a set of configuration options that single or set of components accept that control how the component visually renders.

Each component has a theme and every theme has a `default` property. This is the theme values in the component's default state. Other states may be included per the component's specification; for example focused, hovered, selected, disabled, etc. A Vue theme is the collection of all component themes as one JavaScript object.

## How Theming Works <a name="how-theming-works"></a>
A component ultimately renders from a set of theme values. These theme values are the consolidation of a few layers of themes; each providing a different level of customization. Theme values are calculated from top to bottom:

1. Default theme values (defined on the component's `static defaultThemeProps`)
2. Vue theme values (global theme values defined in a Vue theme)
3. `theme` prop on the component

Once a final set of theme values is calculated, they are used with the components props and state to compute inline styles for the component.

## Enable Theming Components <a name="enable-theming-components"></a>
There are helper functions used to facilitate the above process and aid in preventing a re-invention of the wheel. Here is an example of using the `gettingStyles` helper.

```js
import gettingStyles from '../Theme/gettingStyles';

const getThemeValues = (theme, props, state) => ({ /* final theme values for component */ });
const getStylesFromTheme = (themeValues, props, state) => ({ /* inline styles applied to internals */ }); 
const getStyles = gettingStyles(getThemeValues, getStylesFromTheme);

class TestComponent extends React.Component {
    render() {
        const styles = getStyles(this);
        return (
            <div style={styles.root}>
                <h1 style={styles.heading}>and so on</h1>
            </div>
        );
    }
}
```

Example use of `mergeStyles` helper to merge theme values based on state; in this case, whether the component is focused.

```js
// Can be used to merge theme values and other styles
import mergeStyles from './../Theme/mergeStyles';

const getThemeValues = (theme, props, state) => {
    // Themed values based on state
    const focusedThemeValues = state.focused ? {...TestComponent.defaultThemeProps.focused, ...(theme.TextField.focused || {})} : {};

    // Merge default theme values, then theme's default, then state based theme values;
    return mergeStyles(
        TestComponent.defaultThemeProps.default,
        theme.TestComponent.default,
        focusedThemeValues
    );
};
```