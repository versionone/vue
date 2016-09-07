# Vue

VersionOne Vue is an open-source and community supported collection of common UI components built with React. As an open-sourced and community supported project, VersionOne Vue is not formally supported by VersionOne.

Join the conversation on [Gitter](https://gitter.im/versionone/Vue) and contribute by submitting a [pull request](https://help.github.com/articles/about-pull-requests/).

## Getting Started: Using Vue

```sh
npm install @versionone/vue
```

## Getting Started: Contributing

New component pull requests should include adequate tests, stories (see below) and appropriate documentation in order to be accepted.

```sh
npm install

npm start
# open browser and navigate to http://localhost:3000
# runs documentation site for Vue, locally
```

### Developing Components

```sh
npm start:dev
# open browser and navigate to http://localhost:9001
# runs storybook for Vue; allowing real-time viewing of component stories
```

### Component Structure

Each major component (single or group of related components) is contained within its own directory under `./src`. Every component **must** contain the following within its source directory:

- index.js
- Stories.js
- *.spec.js

#### Stories

Please write appropriate stories for each component in the `Stories.js` file. Stories are primarily used for development of components.

#### Tests

Please write specs for components. Specs can be run via the `npm test` command or with [WallabyJS](https://wallabyjs.com/). In Vue's case, specs are used to validate behavior of components. **Please note**: PR's without adequate specs will not be accepted.

## Other Resources

[LICENSE.md](./license.md) - License for source code and redistribution
