import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export function UserArea(props) {
  const UserAreaSpan = styled.span`
    font-family: brother-1816, sans-serif;
    font-weight: 200;
    color: ${props.mode ? '#ec184a' : '#ffffff'};
    font-size: 0.6em;
    user-select: none;
  `;

  return <UserAreaSpan>{props.children}</UserAreaSpan>;
}

UserArea.propTypes = {
  mode: PropTypes.bool,
  children: PropTypes.node,
};

export function UserAreaMobile(props) {
  const UserAreaMobileSpan = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: brother-1816, sans-serif;
    font-weight: 100;
    color: ${props.mode ? '#ec184a' : '#ffffff'};
    font-size: 0.6em;
    padding: 2em 0em 2em 0em;
  `;

  return <UserAreaMobileSpan>{props.children}</UserAreaMobileSpan>;
}

UserAreaMobile.propTypes = {
  mode: PropTypes.bool,
  children: PropTypes.node,
};
