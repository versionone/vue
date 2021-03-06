import React from 'react';
import SvgIcon from '@versionone/ui/SvgIcon';

class CustomIcon extends React.Component {
    render() {
        return (
            <SvgIcon>
                <path
                    d="M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M17,13h-4.1v3.9h-2V13H7v-2h3.9V6.9h2V11H17V13z"
                />
            </SvgIcon>
        );
    }
}

export default function example() {
    return (
        <CustomIcon width={100} hoverColor="blue" />
    );
}
