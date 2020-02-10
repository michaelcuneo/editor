import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from 'slate';

import { Button, Icon } from './Components';

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

isMarkActive.propTypes = {
  editor: PropTypes.node,
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const MarkButton = ({ editor, format, icon }) => (
  <Button
    active={isMarkActive(editor, format)}
    onMouseDown={event => {
      event.preventDefault();
      toggleMark(editor, format);
    }}
  >
    <Icon>{icon}</Icon>
  </Button>
);

MarkButton.propTypes = {
  editor: PropTypes.object,
  format: PropTypes.string,
  icon: PropTypes.string,
};
