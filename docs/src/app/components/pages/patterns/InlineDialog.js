import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import readme from './InlineDialog.md';
import StatusBadge from './../../StatusBadge';

const InlineDialogPage = (props) => (
    <div>
        <Title render={(previousTitle) => `Inline Dialog - ${previousTitle}`} />
        <StatusBadge status="experimental"/>
        <MarkdownElement text={readme} />
    </div>
);
export default InlineDialogPage;