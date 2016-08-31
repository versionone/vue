import Chip from 'material-ui/Chip';
import React, {Component, PropTypes}  from 'react';
function getLabelColor(status){
    const baseStyle = {margin:4};
    switch (status) {
        case 'experimental':
            return 'blue';
        case 'stable':
            return 'green';
        case 'deprecated':
            return 'red';
        default:
            return '';
    }
}
class StatusBadge extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired
    };

    render() {
        const {status} = this.props;

        return (
            <Chip backgroundColor={getLabelColor(status)} labelColor="white">{status}</Chip>
        );
    }
}
export default StatusBadge;