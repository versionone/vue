---
title: Publishing
menuCategory: Contributing
status: stable
keywords:
  - create
  - new
  - version
  - publish
  - npm
  - package
  - guide
  - contribute
---

This guide will aid you in publishing a new version of `@versionOne/ui`.

1. `git fetch`
1. `git checkout master && git reset --hard origin/master`
1. `./gulp publish --type {versionType}` where version type is one of the following:
    - patch
    - minor
    - major
    - next
1. the docs site will automatically deploy on minor or major releases only.
    
## Publishing Version Types
The valid version types are pulled from the [Semantic Versioning docs](http://semver.org/) and are briefly described below. For more information, be sure to read the [semver docs](http://semver.org/).

### Patch
- no new functionality
- bug fixes

### Minor
- new functionality/new publicly consumable API
- no breaking changes in how to consume any prior functionality

### Major
- new functionality/new publicly consumable API
- there are breaking changes in how to consume any of the prior functionality

### Next
This is used for pre-release versions that need to be tested within LifeCycle or Continuum.

- pre-releases
    - can publish on top of itself at the same version; e.i. v3.0.1-next

