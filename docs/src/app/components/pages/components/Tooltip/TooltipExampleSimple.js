import React from 'react';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';

export default class TooltipSimpleExample extends React.Component {
    constructor(...rest) {
        super(...rest);

        this.state = {
            open: false,
        };
    }

    render() {
        return (
            <div style={{marginBottom: '150px'}}>
                <IconButton tooltipPosition="bottom-right" tooltip="Do you do everything you are told to do?" touch={true} >
                    <Chip>Mouse over to see tooltip</Chip>
                </IconButton>
            </div>
        );
    }
}
