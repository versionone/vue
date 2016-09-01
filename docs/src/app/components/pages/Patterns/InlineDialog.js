import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import readme from './InlineDialog.md';
import pkg from 'versionone-ui/Toolbar/package.json';
import StatusBadge from './../../StatusBadge';

const InlineDialogPage = (props) => (
    <div>
        <Title render={(previousTitle) => `Inline Dialog - ${previousTitle}`} />
        <StatusBadge status="stable"/>
        <MarkdownElement text={readme} />
    </div>
);
export default InlineDialogPage;
export const meta = {
    ...pkg,
    title: 'Inline dialog',
    keywords: [],
    'see also': [
        'popover', 'tooltip'
    ]
};