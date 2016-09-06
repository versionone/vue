import ContentPage from './../components/ContentPage';
import ContentWithPlaygroundPage from './../components/ContentWithPlayground';
import Colors from './../components/pages/foundations/Colors';
import Popover from './../components/pages/components/Popover/Page';
import Toolbar from './../components/pages/components/Toolbar/Page';
import Tooltip from './../components/pages/components/Tooltip/Page';

export default [
    {
        path: 'foundations',
        meta: {
            title: 'Foundations',
            keywords: []
        },
        component: ContentPage,
        nestedMenuItems: [
            {
                path: 'colors',
                meta: {
                    title: 'Colors',
                    keywords: []
                },
                component: Colors
            }
        ]
    },
    {
        path: 'components',
        meta: {
            title: 'Components',
            keywords: []
        },
        component: ContentWithPlaygroundPage,
        nestedMenuItems: [
            {
                path: 'popover',
                meta: {
                    title: 'Popover',
                    keywords: ['dropdown']
                },
                component: Popover
            },
            {
                path: 'toolbar',
                meta: {
                    title: 'Toolbar',
                    keywords: ['dropdown']
                },
                component: Toolbar
            },
            {
                path: 'tooltip',
                meta: {
                    title: 'Tooltip',
                    keywords: ['dropdown']
                },
                component: Tooltip
            }
        ]
    }
];