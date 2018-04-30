import { Children, Component } from 'react';
import * as PropTypes from 'prop-types';

const contextTypes = {
  getAnalyticsContext: PropTypes.func,
};

export default class AnalyticsContext extends Component {
  static propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any,
  }
  static contextTypes = contextTypes;
  static childContextTypes = contextTypes;

  getChildContext = () => ({
    getAnalyticsContext: this.getAnalyticsContext,
  });

  getAnalyticsContext = () => {
    const { data } = this.props;
    const { getAnalyticsContext } = this.context;
    const ancestorData = typeof getAnalyticsContext === 'function'
      ? getAnalyticsContext()
      : [];
    return [
      ...ancestorData,
      data,
    ];
  };

  render() {
    return Children.only(this.props.children);
  }
}