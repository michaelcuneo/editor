import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export function UserBadgeImg(props) {
  const Image = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0.5em;
    padding: 1px;
    border: 2px solid ${props.mode ? '#EC184A' : '#FFFFFF'};
  `;

  return (
    <Image alt={props.alt} src={props.src}>
      {props.children}
    </Image>
  );
}

UserBadgeImg.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.bool,
  alt: PropTypes.string,
  src: PropTypes.string,
};
