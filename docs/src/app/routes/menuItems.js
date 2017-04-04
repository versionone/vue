import pages from './../../../pagesMeta';
import componentMeta from './../../../componentPagesMeta';
import camelCase from 'camelcase';

const isInMenuCategory = (category) => (page) => page.menuCategory === category;

export default [...new Set(pages.map((page) => page.menuCategory))]
    .map((menuCategory) => ({
        path: 'page',
        meta: {
            title: menuCategory
        },
        nestedMenuItems: pages
            .filter(isInMenuCategory(menuCategory))
            .map((page) => ({
                path: camelCase(page.title),
                meta: {
                    title: page.title
                }
            }))
    }))
    .concat([
        {
            path: 'component',
            meta: {
                title: 'Components'
            },
            nestedMenuItems: Object.keys(componentMeta)
                .map((key) => ({
                    path: key,
                    meta: {
                        title: componentMeta[key].name
                    }
                }))
        }
    ]);
