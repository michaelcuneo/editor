import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';

import Popover from 'react-popover';
import { ListBox } from 'primereact/listbox';
import { Button, Icon } from './Components';

import { users } from './users';

export const withMentions = editor => {
  const { isInline, isVoid } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.isInline = element =>
    element.type === 'mention' ? true : isInline(element);

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = element =>
    element.type === 'mention' ? true : isVoid(element);

  return editor;
};

export const MentionElement = ({ attributes, children, element }) => (
  <span
    {...attributes}
    contentEditable={false}
    style={{
      padding: '3px 3px 2px',
      margin: '0 1px',
      verticalAlign: 'baseline',
      display: 'inline-block',
      borderRadius: '4px',
      backgroundColor: '#eee',
      fontSize: '0.9em',
    }}
  >
    @{element.character}
    {children}
  </span>
);

MentionElement.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  element: PropTypes.object,
};

export const MentionButton = () => {
  const editor = useSlate();
  const [isOpen, setOpen] = useState(false);

  const insertMention = character => {
    const mention = { type: 'mention', character, children: [{ text: '' }] };
    Transforms.insertNodes(editor, mention);
    Transforms.move(editor);
  };

  const handleMentionChange = event => {
    const user = event;
    insertMention(user.name);
  };

  const PopoverBody = userList => (
    <ListBox
      optionLabel="name"
      optionValue="name"
      options={userList}
      onChange={e => handleMentionChange(e.value)}
    />
  );

  return (
    <React.Fragment>
      <Popover
        body={PopoverBody(users)}
        place="below"
        isOpen={isOpen}
        onOuterAction={() => setOpen(!isOpen)}
      >
        <Button onClick={() => setOpen(!isOpen)}>
          <Icon>alternate_email</Icon>
        </Button>
      </Popover>
    </React.Fragment>
  );
};
