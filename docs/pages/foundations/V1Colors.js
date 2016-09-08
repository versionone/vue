import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from 'vue-docs/MarkdownElement';
import readme from './colors.md';
import StatusBadge from 'vue-docs/StatusBadge';

export default (props) => {
    return (
        <div>
            <Title render={(previousTitle) => `${props.title} - ${previousTitle}`} />
            <StatusBadge status={props.status}/>
            <MarkdownElement text={readme} />
        </div>
    );
};