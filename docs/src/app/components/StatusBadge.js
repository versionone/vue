import Chip from 'material-ui/Chip';
import React, {Component, PropTypes}  from 'react';
function getLabelColor(status){
    const baseStyle = {margin:4};
    switch (status) {
        case 'experimental':
            return '#008EC0';
        case 'stable':
            return '#86A10E ';
        case 'deprecated':
            return '#E94800';
        default:
            return '#474C54';
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