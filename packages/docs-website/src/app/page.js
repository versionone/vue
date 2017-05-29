var matter = require('front-matter');

export default (content) => {
    if (typeof content === 'string') {
        const pageMeta = matter(content);
        return {
            readme: pageMeta.body,
            ...pageMeta.attributes
        };
    }

    return {
        component: content
    };
};
