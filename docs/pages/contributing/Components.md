---
title: Components
menuCategory: Contributing
status: draft
keywords:
  - create
  - new
  - structure
  - guide
---

This guide details the the structure of components an the process to submit a new component. To learn more about component implementation and theming, then checkout the [component theming guide](/pages/Theming-Components).

## Component Structure

Every major component is grouped into its own directory under `./src`. It, at the minimum, must contain the following files; each of which will be explained in further detail below:

```bash
.
├── _meta.js
├── index.js
├── README.md
├── ComponentName.js
├── ComponentName.spec.js
├── Stories.js
├── examples
|   └── index.js
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
In some cases, a component directory may represent multiple components that are used collectively. These other "related" components tend to not make sense to be used outside the context of the main component directory's component. An example is `<Toolbar />`. It also  contains `<ToolbarGroup />' and `<ToolbarTitle />`. All related components should reside within the main component's directory and the `index.js` should export each one individually. It should **not** export a default.

```js
export {default as Toolbar} from './Toolbar';
export {default as ToolbarGroup} from './ToolbarGroup';
export {default as ToolbarTitle} from './ToolbarTitle';
```

### README.md
This file should include the content for the component's documentation. This is used to generate the documentation page for each component.

### Component file(s) and their Specs
All components should have their own source and spec files. Every component should contain appropriate tests for its functionality. These tests should live side-by-side with the source component file. Tests should consist of the component file's name appended with `.spec`.

Tests may be run via WallabyJS or with the command: `npm test`.

### Stories.js
The `Stories.js` file holds all stories to be loaded into [Storybook](https://github.com/kadirahq/react-storybook). Storybook is purely to ease the development of components by providing real-time rendering updates for components.

### Examples
An examples directory should contain an `index.js` exporting an array of examples files and their meta data. Each example file **must export a default** component class to be used as the example. Here is an example of the `index.js`.

```js
export default [
    {
        title: 'Simple Example',

        description: 'A simple example showing a Popover containing a [Menu](/#/components/menu). It can be also closed by clicking away from the Popover.',

        code: require('!raw!./SimpleExample'),

        component: require('./SimpleExample').default
    }
];
```

## Registering with Docs Site
Each component's `_meta.js` must be registered with the docs site. This is done by exporting the `_meta.js` within the `./src/_meta.js` file. See below:

```js
// other exports
export {default as compnentName} from './ComponentName/_meta';
```

## Submitting a New Component
Please ensure the above requirements are met. Once done, submit a PR from your component's branch to the current version under development's branch.
