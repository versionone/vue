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
            description: '',
            keywords: []
        },
        component: ContentPage,
        nestedMenuItems: [
            {
                path: 'colors',
                meta: {
                    title: 'Colors',
                    description: '',
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
            description: '',
            keywords: []
        },
        component: ContentWithPlaygroundPage,
        nestedMenuItems: [
            {
                path: 'popover',
                meta: {
                    title: 'Popover',
                    description: '',
                    keywords: ['dropdown']
                },
                component: Popover
            },
            {
                path: 'toolbar',
                meta: {
                    title: 'Toolbar',
                    description: '',
                    keywords: ['dropdown']
                },
                component: Toolbar
            },
            {
                path: 'tooltip',
                meta: {
                    title: 'Tooltip',
                    description: '',
                    keywords: ['dropdown']
                },
                component: Tooltip
            }
        ]
    }
];