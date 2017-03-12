# V1-Vue
VersionOne Vue is an open-source and community supported collection of common UI components built with React. As an open-sourced and community supported project, VersionOne Vue is not formally supported by VersionOne.

## Getting Started
If you simply want to learn the API of a component, check out the [docs site](http://versionone.github.io/vue/release) for each major/minor release.

### Step 1: Prerequisites
Run `npm run verify` in your console to see if you have the correct software versions required for Vue. If there are errors, then please ensure you have the following software installed:

- **node@^6.10.0**
    - *tests will not work with node@7.3 or node@7.4*
- **yarn@^0.21.3**

### Step 2: Installing Dependencies
Run `yarn run setup`. If there is an error, see the [Prerequisites](#Step-1-Prerequisites) section.

**NOTE**: This is only required to be run either the **first** time running Vue on your machine **or** if new dependencies have been added (will produce an error when running the commands below).

### Step 3: Running the Documentation Site Locally
Run `yarn start` and open your browser to **[http://localhost:3000](http://localhost:3000)**.

If there is an error, try running `yarn run setup` again.

### Step 4: Running Storybook Locally
Run `yarn run start:dev` and open your browser to **[http://localhost:9001](http://localhost:9001)**.

If there is an error, try running `yarn run setup` again.

## Developing and Testing with LifeCycle

If you make changes to a vue component and wish to see how they behave in LifeCycle, link your local vue repository with LifeCycle:

```sh
../Core/npm link
cd ../Core/VersionOne.Web
../npm link v1-vue
```

If you wish to unlink from your local copy of vue:

```sh
cd ../Core/VersionOne.Web
../npm unlink v1-vue
```

## Other Resources
[LICENSE.md](./license.md) - License for source code and redistribution
