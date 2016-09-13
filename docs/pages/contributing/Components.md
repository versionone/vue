---
title: Components
menuCategory: Contributing
status: draft
keywords:
  - create
  - new
  - component
---

This guide will aid in creating new components to be added to the library and to the docs site. There are two steps to creating a component; writing the component and then registering it with the docs site.

## Creating a Component

Every major component is grouped into its own directory under `./src`. Here is an example of a component, with specs, stories, documentation, and examples.

```shell
.
├── _meta.js
├── index.js
├── README.md
├── ComponentName.js
├── ComponentName.spec.js
├── Stories.js
├── examples
|   ├── index.js
|   └── SimpleExample.js
```

### _Meta.js
This file contains all metadata about the component; to be consumed by the docs site. This includes the name of the component, keywords for searching, the readme text (via requiring the component's README.md), and a status.
 
It also includes any component sources and their associated name. Typically there will only be one (one component per directory), however sometimes a component directory may contain multiple components; in which case, each would be listed.

Finally, there is an examples key with a value of an array of examples. We are importing the `examples/index.js` which contains the array of all examples and their meta data.

```js
import examples from './examples';

export default {
    name: 'ComponentName',
    keywords: ['tooltip', 'drop down menu'],
    readme: require('./README.md'),
    status: 'experimental | stable | deprecated',
    componentsSources: [
        {
            name: 'ComponentName',
            code: require('!raw!./ComponentName')
        }
    ],
    examples
}
```

### index.js
The `index.js` of the component directory is the publicly exported parts of your component. Typically, this will be a default export of the component's class like below:

```js
import component from './ComponentName';
export default component;
```

#### Variations
In some cases, a component may be a few components used collectively together, that cannot be used apart. A `<Toolbar />`, with `<ToolbarGroup />' and `<ToolbarTitle />` is a good example. When this is the case, all related components should reside within the component's directory and the `index.js` should export each one individually. It should **not** export a default.

```js
export {default as Toolbar} from './Toolbar';
export {default as ToolbarGroup} from './ToolbarGroup';
export {default as ToolbarTitle} from './ToolbarTitle';
```

### README.md
This file should include the content for the component's documentation; used to display on the component's page above the examples.

### ComponentName.js and Specs
Every component within the component directory, should have its own file and contain appropriate tests. Each component's tests should live side-by-side with the component's file. Tests should consist of the component file's name appended with `.spec`.

Tests may be run via WallabyJS or with the command: `npm test`.

### Stories.js
The `Stories.js` file holds any stories to be loaded into [Storybook](https://github.com/kadirahq/react-storybook). Storybook is purely to ease the development of components by providing real-time rendering updates for components.

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
Each component's `_meta.js` needs to be registered with the docs site. This can be accomplished by exporting the `_meta.js` within the `./src/_meta.js` file. See below:

```js
// other exports
export {default as compnentName} from './ComponentName/_meta';
```