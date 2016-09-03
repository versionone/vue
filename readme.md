# Vue

Common UI components developed and used by VersionOne; built with React.

## Getting Started

```sh
npm install

npm start
# open browser and navigate to http://localhost:3000
# runs documentation site for Vue, locally
```

## Contributing

New component PR's should include tests, stories (see below) and appropriate documentation in order to be accepted.

### Developing Components

```sh
npm start:dev
# open browser and navigate to http://localhost:9001
# runs storybook on Vue; allowing real-time viewing of component stories
```

#### Structure

Each major component (single or group of related components) is contained within its own directory under `./src`. Every component **must** contain the following within its source directory:

- index.js
- Stories.js
- *.spec.js

#### Stories

Please write appropriate stories for each component in the `Stories.js` file. Stories are primarily used for development of components.

#### Tests

Please write specs for components. Specs can be run via the `npm test` command or with [WallabyJS](https://wallabyjs.com/). In Vue's case, specs are used to validate behavior of components. **Please note**: PR's without adequate specs will not be accepted.