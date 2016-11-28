# Vue
VersionOne Vue is an open-source and community supported collection of common UI components built with React. As an open-sourced and community supported project, VersionOne Vue is not formally supported by VersionOne.

## Prerequisites
Vue requires **node@^4.4.0** and **npm@^3.0.0**. If you have attempted to run Vue with a different version of npm or need to upgrade to the correct version, use the following commands:

```bash
# 1. If tried npm install with wrong npm version, this will remove all packages installed with the incorrect version of npm
rm -rf node_modules docs/node_modules

# 2. Upgrade npm to correct version
npm install npm@^3.0.0 -g
```

## Getting Started: Running the Documentation Site Locally
Run the documentation site to view changes to the documentation of components or other doc pages.

```bash
# 1. Install dependencies
npm install

#2. Start the documentation website
npm start

#3. Open browser and navigate to http://localhost:3000 to view documentation website
```

## Getting Started: Running Storybook Locally
The storybook is primarily used for development and testing purposes.

```bash
# 1. Install dependencies
npm Install

# 2. Start Storybook
npm run start:dev

# 3. Open browser and navigate to http://localhost:9001 to view the storybook
```

## Other Resources
[LICENSE.md](./license.md) - License for source code and redistribution
