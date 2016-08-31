import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';

export default class extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    render() {
        const styles = {
            width: '100%'
        };
        return (
            <TextField hintText="keywords" floatingLabelText="I'm looking for..." style={styles} onKeyDown={this.search} />
        )
    }

    search = (evt) => {
        if (evt.keyCode === 13) {
            this.context.router.push(`search/${evt.target.value}`);
        }
    };
};