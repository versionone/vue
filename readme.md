# Vue
VersionOne Vue is an open-source and community supported collection of common UI components built with React. As an open-sourced and community supported project, VersionOne Vue is not formally supported by VersionOne.

## Getting Started
### Step 1: Prerequisites
Required software:

- **node@^4.4.0**
- **npm@^3.0.0**

You can run `npm run verify` to determine if you meet the above requirements. If you do not **and** have already attempted to run Vue, then you need to run the following commands: `rm -rf node_modules docs/node_modules` and `npm install npm@^3.0.0 -g`.

### Step 2: Installing Dependencies
Run `npm install`. If there is an error, see the [Prerequisites](#Step-1-Prerequisites) section.

This is only required to be run either the **first** time running Vue on your machine **or** if new dependencies have been added (will produce an error when running the commands below).

### Step 3: Running the Documentation Site Locally
Run `npm start` and open your browser to **[http://localhost:3000](http://localhost:3000)**.

If there is an error, try running `npm install` again.

### Step 4: Running Storybook Locally
Run `npm run start:dev` and open your browser to **[http://localhost:9001](http://localhost:9001)**.

If there is an error, try running `npm install` again.

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
