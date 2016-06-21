import InlineStylePrefixer from 'inline-style-prefixer';

export default function(theme) {
    let userAgent = theme.userAgent;

    if (userAgent === undefined && typeof navigator !== 'undefined') {
        userAgent = navigator.userAgent;
    }

    if (userAgent === false) {
        return null;
    }
    if (userAgent === 'all' || userAgent === undefined) {
        return (style) => InlineStylePrefixer.prefixAll(style);
    }
    const prefixer = new InlineStylePrefixer({
        userAgent: userAgent
    });

    return (style) => prefixer.prefix(style);
}
