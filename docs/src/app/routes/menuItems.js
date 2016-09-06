import ComponentPage from './../components/pages/components';
import Popover from './../components/pages/components/Popover/Page';
import Toolbar from './../components/pages/components/Toolbar/Page';
import Tooltip from './../components/pages/components/Tooltip/Page';

export default [
    {
        path: 'components',
        component: ComponentPage, // dynamically build markdown-only page
        nestedMenuItems: [
            {
                path: 'popover',
                component: Popover
            },
            {
                path: 'toolbar',
                component: Toolbar
            },
            {
                path: 'tooltip',
                component: Tooltip
            }
        ]
    }
];