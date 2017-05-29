---
title: Documentation
status: stable
keywords:
  - create
  - new
  - page
  - guide
  - contribute
  - docs
---

This guide will aid in creating new documentation. This consists of creating new pages, updating existing pages and adding pages within new menu categories.

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
// Other pages
require('./patterns/another page.md'),

// Your new page
require('./contributing/Sample Page.md'),

// Other pages
require('./patterns/some different page.md')
];
```

## Creating a new Menu Category
In order to create a new main menu category, there needs to be at least one page that has the `menuCategory` meta data with the new menu category. The order of the menu items is dependent on the order of pages associated with the menu category in `./docs/pages/index.js`.

For **example**, you want to place a new menu category, "Test Category", between categories "One" and "Two". In order to do this, create a new page with your new menu category. Then require your new page in the `./docs/pages/index.js`; ensuring it is below all pages that have the category, "One", and above all pages with the category, "Two".

```js
export default [

    require('./One/Sample Page with Category One.md'), // The last page with "One" as the menu category
    require('./Test Category/Your New Page.md'), // your page
    require('./Two/another page.md') // First page with "Two" as the menu category
];
```

## Advanced Page Creation Using Components
In some cases, a markdown file of content is not sufficient for a page. One such example is the "Foundations/Colors" page. In these instances, the page may be JavaScript.

JavaScript pages are page files that export a title, status, menuCategory, and component. Register the page as usual.

```js
export const title =  'Colors';
export const status = 'draft';
export const menuCategory = 'Foundations';
export const component = () => (
    <h1>My Page of Colors</h1>
);
```
