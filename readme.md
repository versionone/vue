# VersionOne UI

A collection of re-usable UI components developed and used by VersionOne. View the components in action in our ~[storybook](https://andrew-codes.github.io/component-ui)~.

## Running the Docs
```
cd docs
npm install # one time installation

npm start # http://localhost:3000
```

## Getting Started

```bash
npm install

npm start # open browser and go to http://localhost:9001 to view storybook
```

## Contributing

New component PR's should include tests and stories (see below) in order to be accepted.

### Structure

Each major component (single or group of related components) is contained within its own directory under `./src`. Every component **must** contain the following within its source directory:

- index.js
- Stories.js
- *.spec.js

### Stories

Please write appropriate stories for each component in the `componentName/Stories.js` file.

### Testing

Please write specs for components. Specs can be run via the `npm test` command or [WallabyJS](https://wallabyjs.com/). PR's without adequate specs will not be accepted.