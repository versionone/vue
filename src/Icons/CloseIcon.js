import React from 'react';
import SvgIcon from './../SvgIcon';

const CloseIcon = props => (
    <SvgIcon {...props}>
        <polygon points="16,3.3 12.7,0 8,4.8 3.3,0 0,3.3 4.8,8 0,12.7 3.3,16 8,11.2 12.7,16 16,12.7 11.2,8 "/>
    </SvgIcon>
);
CloseIcon.displayName = 'CloseIcon';
export default CloseIcon;
