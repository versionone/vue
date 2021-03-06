import React from 'react';
import SvgIcon from './../SvgIcon';

const AddIcon = props => (
    <SvgIcon {...props}>
        <path
        d="M8,0.5C3.9,0.5,0.5,3.9,0.5,8s3.4,7.5,7.5,7.5s7.5-3.4,7.5-7.5S12.1,0.5,8,0.5z M13,9H8.9v3.9h-2V9H3V7h3.9V2.9h2V7H13V9z"
    />
    </SvgIcon>
);
AddIcon.displayName = 'AddIcon';
export default AddIcon;
