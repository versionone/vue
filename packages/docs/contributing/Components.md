---
title: Components
status: stable
keywords:
  - create
  - new
  - structure
  - guide
  - contribute
---

This guide details the the structure of components an the process to submit a new component. To learn more about theme enabling within your component implementation, then checkout the [theme enabled component guide](#/page/ThemeEnabledComponents).

## TL;DR

1. [Component Structure](#component-structure)
1. [Register with Docs](#registering-with-the-docs-site)
1. [Theming Components](#/page/ThemeEnabledComponents)
1. [Other Component Requirements](#requirements-for-components)
1. [Submission](#submitting-a-new-component)
1. [Publishing](#/page/Publishing)


## Component Structure

Every major component is grouped into its own directory under `./src`. It, at the minimum, must contain the following files; each of which will be explained in further detail below:

```bash
.
├── __tests__
|   └── ComponentName.test.js
├── examples
|   ├── SomeExample.js
|   └── index.js
├── _meta.js
├── ComponentName.js
├── index.js
├── README.md
└── Stories.js
```

### `_meta.js`
This file contains all metadata about the component used by the docs site. This includes the name of the component, keywords for searching, the readme text (via requiring the component's README.md), and a status.

It also includes all component sources and their associated name. Each entry in the `componentSources` contains the name of the associated component. The entry's `code` property is set to the raw source of the component source code; used by the docs site. Typically there will only be one entry (one component per directory); however, a component directory can contain multiple, related components. In these cases, each must be represented as an entry.

Finally, there is an examples property with a value of an **array** of examples. All examples should be exported in the `examples/index.js`, so this property's values is simply the imported value of `./examples`.

```js
import examples from './examples';

export default {
    name: 'ComponentName',
    keywords: ['tooltip', 'drop down menu'],
    readme: require('./README.md'),
    status: 'experimental', // | 'stable' | 'deprecated',
    componentsSources: [
        {
            name: 'ComponentName',
            code: require('!raw!./ComponentName')
        }
    ],
    examples
}
```

### `index.js`
The `index.js` of the component directory contains all the **publicly** exported component(s). Typically, this will be a default export of the component's class like below:

```js
import component from './ComponentName';
export default component;
```

#### Variations in `index.js`
In some cases, a component directory may represent multiple components that are used collectively. These other "related" components tend to not make sense to be used outside the context of the main component directory's component. An example is `<Toolbar />`. It also  contains `<ToolbarGroup />' and `<ToolbarTitle />`. All related components should reside within the main component's directory and the `index.js` should export each one individually with the main component as the default.

```js
import ToolbarComponent from './Toolbar';
export default ToolbarComponent;

export {default as ToolbarGroup} from './ToolbarGroup';
export {default as ToolbarTitle} from './ToolbarTitle';
```

### README.md
This file should include the content for the component's documentation. This is used to generate the documentation page for each component.

### Component file(s) and their Tests
All components should have their own source and test files. Every component should contain appropriate tests for its functionality. These tests live within the `__tests__` directory. Tests should consist of the component file's name appended with `.test`.

Tests can be run via WallabyJS or with the command: `./gulp test`.

### Stories.js
The `Stories.js` file holds all stories to be loaded into [Storybook](https://github.com/kadirahq/react-storybook). Storybook is purely to ease the development of components by providing real-time rendering updates for components.

Storybook can be run with the command: `./gulp start`.

### Examples
An examples directory should contain an `index.js` exporting an array of examples files and their meta data. Each example file **must export a default** component to be used as the example. Here is an example of the `index.js`.

```js
export default [
    {
        title: 'Simple Example',

        description: 'A simple example showing a Popover containing a [Menu](#/components/menu). It can be also closed by clicking away from the Popover.',

        code: require('!raw!./SimpleExample'),

        component: require('./SimpleExample').default
    }
];
```

## Registering with Docs Site
Each component's `_meta.js` must be registered with the docs site. This is done by exporting the `_meta.js` within the `./src/_meta.js` file. See below:

```js
export {default as componentName} from './ComponentName/_meta';
```

## Requirements for Components

## Favor stateless functional components over classes
If a component has no state or need of a DOM reference element, use a stateless functional component instead of one extending React.Component.

```js
const favorThis = (props, context) => (
    <h1>Favor Me!</h1>
);

class ClassComponent extends Component {
    render() {
        return (
            <h1>A class component</h1>
        );
    }
}
```

### Theme-Enabled
In addition to the above items, evey component should be [theme-enabled](/pages/Theming-Components) and contain all appropriate `propTypes` and `defaultProps` values. For consistency between stateless functional and class components, please include the `propTypes` and `defaultProps` without using the `static` keyword.

Each `propTypes` should contain a comment description above it and deprecated `propTypes` should be marked via a comment as well. Here are a few examples (including deprecated `propTypes`):

```js
import {deprecated, origin} from './../utilities/CustomPropTypes';
// ---
ComponentName.propTypes = {
    /**
     * This is the point on the popover which will attach to
     * the anchor's origin.
     * Options:
     * vertical: [top, middle, bottom];
     * horizontal: [left, center, right].
     */
    targetOrigin: origin,
    /**
     * If true, the popover (potentially) ignores `targetOrigin`
     * and `anchorOrigin` to make itself fit on screen,
     * which is useful for mobile devices.
     */
    shouldAutoAdjustPosition: PropTypes.bool,
    /**
     * Callback function fired when the popover is requested to be closed.
     *
     * @param {string} reason The reason for the close request. Possibles values
     * are 'clickAway' and 'offScreen'.
     */
    onRequestClose: PropTypes.func,
    /**
     * The function to call when the user presses the Enter key.
     */
    onEnterKeyDown: deprecated(PropTypes.func,
      'Use onKeyDown and check for keycode instead. It will be removed with v0.16.0.'),
    /** @ignore */
    onFocus: PropTypes.func,
};
```

## Submitting a New Component
Please ensure the above requirements are met. Once done, submit a PR from your component's branch to `master`.
