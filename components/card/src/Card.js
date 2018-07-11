import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTheme } from '@versionone/ui-theme';
import { ThemeProvider } from 'emotion-theming';

import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

const propTypes = {
  /**
   * One of CardHeader, CardBody, CardFooter
   */
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(CardBody),
    PropTypes.instanceOf(CardFooter),
    PropTypes.instanceOf(CardHeader),
  ]),
  /**
   * Applies border around entire card when true
   */
  hasBorder: PropTypes.bool,
  /**
   * Applies shadow below card to simulate 3-d space when true
   */
  hasShadow: PropTypes.bool,
};

const defaultProps = {
  children: [],
  hasBorder: false,
  hasShadow: true,
};

const Section = styled('section')`
  ${p => p.theme.Card()(p)}
`;

function Card (props) {
  const {
    children,
    hasShadow,
    ...restProps
  } = props;

  const wrappedChildren = children ? React.Children.toArray(children) : [];
  const cardBody = wrappedChildren.filter(
    child => child.type === CardBody
    || child.type.displayName === 'CardBody'
  );
  const cardFooter = wrappedChildren.filter(
    child => child.type === CardFooter
    || child.type.displayName === 'CardFooter'
  );
  const cardHeader = wrappedChildren.filter(
    child => child.type === CardHeader
    || child.type.displayName === 'CardHeader'
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section
        hasShadow={hasShadow}
        {...restProps}
      >
        {cardHeader}
        {cardBody}
        {cardFooter}
      </Section>
    </ThemeProvider>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
