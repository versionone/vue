import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';

export default class extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    render() {
        return (
            <TextField hintText="keywords" floatingLabelText="I'm looking for..." onKeyDown={this.search} />
        )
    }

    search = (evt) => {
        if (evt.keyCode === 13) {
            this.context.router.push(`search/${evt.target.value}`);
        }
    };
};