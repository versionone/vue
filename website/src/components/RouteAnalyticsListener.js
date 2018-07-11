import { Component } from 'react';
import { withAnalytics } from '@versionone/ui-analytics';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';

class RouteAnalyticsListener extends Component {
  static propTypes = {
    children: PropTypes.node,
    createAnalyticsEvent: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object,
  };

  componentDidMount() {
    const { createAnalyticsEvent, location } = this.props;
    createAnalyticsEvent({ location }).fire('navigate');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      nextProps.createAnalyticsEvent({ location: nextProps.location, }).fire('navigate');
    }
  }

  render() {
    const {
      children,
    } = this.props;

    return children;
  }
}

export default compose(withAnalytics(), withRouter)(RouteAnalyticsListener);
