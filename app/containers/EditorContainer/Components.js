import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { cx, css } from 'emotion';

export const Button = React.forwardRef(
  ({ className, active, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${active ? '#fbfbf8' : '#aaa'};
        `,
      )}
    />
  ),
);

Button.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
};

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

export function Toolbar({ children }) {
  const StyledToolbar = styled(Menu)`
    position: relative;
    background: #464646;
    color: #ffffff;
    padding: 17px 18px 17px;
    margin: 0 0;
    border-radius: 10px 10px 0px 0px;
  `;

  return <StyledToolbar>{children}</StyledToolbar>;
}

Toolbar.propTypes = {
  children: PropTypes.node,
};
