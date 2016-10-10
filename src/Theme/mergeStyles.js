const reduceNestedStyles = (parent, styleSet) => {
    Object.keys(styleSet).forEach((prop) => {
        if (typeof styleSet[prop] === 'object') {
            parent[prop] = reduceNestedStyles(parent[prop] || {}, styleSet[prop]);
        }
        else {
            parent = {...parent, [prop]: styleSet[prop]};
        }
    });
    return parent;
};

export default (...styles) => styles.reduce(reduceNestedStyles, {});