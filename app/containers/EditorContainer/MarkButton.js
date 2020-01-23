import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { Button, Icon } from './Components';

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

isMarkActive.propTypes = {
  editor: PropTypes.node,
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
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
};

MarkButton.propTypes = {
  format: PropTypes.string,
  icon: PropTypes.string,
};

export default MarkButton;
