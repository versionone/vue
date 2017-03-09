export const isDescendant = (parent, child) => {
    let node = child.parentNode;

    while (Boolean(node)) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};
