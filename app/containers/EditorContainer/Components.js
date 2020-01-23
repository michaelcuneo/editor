import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { cx, css } from 'emotion';

/*
// Find a way to fix the unused expression...
export const Button = styled('span')`
  cursor: pointer;
  color: ${props => {
    if (props.reversed) {
      // eslint-disable-next-line no-unused-expressions
      props.active ? 'white' : '#aaa';
    } else {
      // eslint-disable-next-line no-unused-expressions
      props.active ? 'black' : '#ccc';
    }
  }};
`;
*/

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
  )
)


export const Icon = styled(({ className, ...rest }) => (
  <span className={`material-icons ${className}`} {...rest} />
))`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export function Toolbar({ children, mode }) {
  const StyledToolbar = styled(Menu)`
    position: relative;
    background: ${mode ? '#ec184a' : '#fff'};
    color: ${mode ? '#fff' : '#000'};
    padding: 17px 18px 17px;
    margin: 0 0;
    border-radius: 10px 10px 0px 0px;
  `;

  return <StyledToolbar>{children}</StyledToolbar>;
}

Toolbar.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.bool,
};
