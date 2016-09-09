---
title: Documentation
menuCategory: Contributing
status: draft
keywords:
  - create
  - new
  - document
---

This guide will aid in creating new documentation; consisting of new or updating existing pages and adding new menu categories.

## Creating a new Sample Documentation Page

For this example, we will create a new page underneath the "Contributing" menu item titled "Sample Page".

All documentation pages are located in the `./docs/pages` directory. In order to create our new page, we will create a new markdown file, `./docs/pages/contributing/Sample Page.md`. Note that the file may exist in a sub-directory under `./docs/pages`.

In our new file, we will add any meta data about the page at the top of the file. Meta data fits within lines starting with `---`. As an example:

```md
---
title: Sample Page
menuCategory: Contributing
status: draft
keywords:
  - example
  - documentation
---

Content goes here.
```

Notice the `menuCategory` meta data as it controls which main menu item the new page will reside.

Finally, we need to register our new page with the site. This is done by editing `./docs/pages/index.js` and requiring our new page and including it in the list of pages. This would look like the following:

```js
export default [
require('./patterns/another page.md'),
require('./contributing/Sample Page.md')   
];
```

## Creating a new Menu Category

In order to create a new main menu category, there needs to be at least one page that has the `menuCategory` meta data with the new menu category. The order of the menu items is dependent on the order of pages associated with the menu category in `./docs/pages/index.js`. To place the menu category at the top of the menu would require adding a page with the menu category above any other pages with a different menu category.

```js
export default [

    // Contributing menu category pages
    require('./contributing/Sample Page.md'), // first category among all pages

    // Other menu category pages
    require('./patterns/another page.md')  
];
```

## Advanced Page Creation Using Components

In some cases, a markdown file of content is not sufficient for a page. One such example is the "Foundations/Colors" page. In these instances, a page may be registered as a React Component.

After creating the component to represent the page, register the component page in the `./docs/pages/index.js` and include any meta data you want with its registration. Using the "Colors" page as an example:

```js
export default [
    // Foundation pages
    {
        title: 'Colors',
        status: 'draft',
        menuCategory: 'Foundations',
        component: require('./foundations/Colors')
    },

    // Other pages
    require('./patterns/another page.md'),
];
```
