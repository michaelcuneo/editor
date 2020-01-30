import React from 'react';
import PropTypes from 'prop-types';

import { Editor, Transforms } from 'slate';

import { Button, Icon } from './Components';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    // eslint-disable-next-line no-nested-ternary
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton = ({ editor, format, icon }) => (
  <Button
    active={isBlockActive(editor, format)}
    onMouseDown={event => {
      event.preventDefault();
      toggleBlock(editor, format);
    }}
  >
    <Icon>{icon}</Icon>
  </Button>
);

BlockButton.propTypes = {
  editor: PropTypes.object,
  format: PropTypes.string,
  icon: PropTypes.string,
};

export default BlockButton;
