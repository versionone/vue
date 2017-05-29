import React, {Component, PropTypes}  from 'react';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
/*
 (experimental) - this item is new and not fully tested use with care
 (stable) - this item is good to use
 (deprecated) - this item is going away please check with UX before using
 */
function getLabelColor(status){
    const baseStyle = {margin:4};
    switch (status) {
        case 'experimental':
            return {
                color:'#008EC0',
                text: 'API may break at any time; use with caution'
            };
        case 'stable':
            return {
                color:'#86A10E ',
                text: 'this item is good to use'
            };
        case 'deprecated':
            return {
                color:'#E94800',
                text: 'do not use; please check with UX for alternatives'
            };
        default:
            return {
                color:'#474C54',
                text: 'unknown status'
            };
    }
}
class StatusBadge extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired
    };

    //hack: using IconButton to get a tooltip
    //hack using markdown-body for consistent styling
    render() {
        const {status} = this.props;

        return (
            <div className="markdown-body">
            <h3 > Status
                <IconButton tooltipPosition="bottom-right" tooltip={getLabelColor(status).text} touch={true} >
                    <Chip backgroundColor={getLabelColor(status).color} labelColor="white">{status}</Chip>
                </IconButton>
            </h3>
            </div>
        );
    }
}
export default StatusBadge;