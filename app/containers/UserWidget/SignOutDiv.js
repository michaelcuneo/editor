import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'rebass';

export const SignOutText = props => {
  const StyledText = styled(Text)`
    font-family: brother-1816, sans-serif;
    padding: 0px 10px 0px 10px;
    font-weight: 200;
    font-style: normal;
    color: ${props.mode ? '#ffffff' : '#ec184a'};
    -webkit-touch-callout: none;
    user-select: none;
    user-drag: none;
  `;

  return <StyledText>{props.children}</StyledText>;
};

SignOutText.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.bool,
};

export const SignOutIcon = styled.div`
  padding: 0px 10px 0px 10px;
`;

export const SignOutDiv = styled.div`
  display: inline-flex;
`;

export const SignOutDivMobile = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0);
  color: #ffffff;
  padding: 0px 10px 0px 10px;
  -webkit-touch-callout: none;
  user-select: none;
  user-drag: none;
  cursor: pointer;
  outline: 0;
  font-family: brother-1816, sans-serif;
  font-weight: 200;
  font-style: normal;
`;
