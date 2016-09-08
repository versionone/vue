import Colors from './../components/pages/foundations/Colors';
import InlineDialog from './../components/pages/patterns/InlineDialog';
import componentMeta from './../../../componentsMeta';

export default [
    {
        path: 'foundations',
        meta: {
            title: 'Foundations',
            description: '',
            keywords: []
        },
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
        path: 'patterns',
        meta: {
            title: 'Patterns',
            description: '',
            keywords: []
        },
        nestedMenuItems: [
            {
                path: 'inlineDialog',
                meta: {
                    title: 'Inline Dialog',
                    description: '',
                    keywords: ['dropdown', 'modal', 'tooltip']
                },
                component: InlineDialog
            }
        ]
    },
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
];