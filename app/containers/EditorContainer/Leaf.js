import React from 'react';
import PropTypes from 'prop-types';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    // eslint-disable-next-line no-param-reassign
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    // eslint-disable-next-line no-param-reassign
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    // eslint-disable-next-line no-param-reassign
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    // eslint-disable-next-line no-param-reassign
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  leaf: PropTypes.object,
};

export default Leaf;
