import React, { useCallback, useMemo, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

import { changeValue } from 'containers/App/actions';
import { Toolbar } from './Components';

// Nodes
import { serialize, deserialize } from './Node';
import Element from './Element';

// Buttons
import { BlockButton, toggleBlock } from './BlockButton';
import { LinkButton, withLinks } from './LinkButton';
import { ImageButton, withImages } from './ImageButton';

const EditorContainer = ({ initialValues, onChangeValue }) => {
  // Get the initial document deserialized string from intialValues
  const intialDocumentDeserialized = new DOMParser().parseFromString(
    initialValues,
    'text/html',
  );

  const [value, setValue] = useState(
    initialValues
      ? deserialize(intialDocumentDeserialized.body)
      : deserialize(localStorage.getItem('content')),
  );

  const renderElement = useCallback(props => <Element {...props} />, []);
  const editor = useMemo(
    () => withImages(withLinks(withHistory(withReact(createEditor())))),
    [],
  );

  const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  };

  return (
    <React.Fragment>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          setValue(newValue);
          onChangeValue(serialize(newValue));
          localStorage.setItem('content', serialize(newValue));
        }}
      >
        <Toolbar>
          <BlockButton editor={editor} format="bold" icon="format_bold" />
          <BlockButton editor={editor} format="italic" icon="format_italic" />
          <BlockButton
            editor={editor}
            format="underline"
            icon="format_underlined"
          />
          <BlockButton editor={editor} format="code" icon="code" />
          <BlockButton editor={editor} format="heading-one" icon="looks_one" />
          <BlockButton editor={editor} format="heading-two" icon="looks_two" />
          <BlockButton
            editor={editor}
            format="block-quote"
            icon="format_quote"
          />
          <BlockButton
            editor={editor}
            format="numbered-list"
            icon="format_list_numbered"
          />
          <BlockButton
            editor={editor}
            format="bulleted-list"
            icon="format_list_bulleted"
          />
          <LinkButton editor={editor} />
          <ImageButton editor={editor} />
        </Toolbar>
        <Editable
          style={{
            padding: '0.5em 0.5em 0.5em 1em',
            color: '#464646',
            borderLeft: `2px solid #464646`,
            borderBottom: `2px solid #464646`,
            borderRight: `2px solid #464646`,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            userSelect: 'none',
          }}
          renderElement={renderElement}
          placeholder=""
          spellCheck
          autoFocus
          onKeyDown={event => {
            Object.keys(HOTKEYS).forEach(key => {
              if (isHotkey(key, event)) {
                event.preventDefault();
                const block = HOTKEYS[key];
                toggleBlock(editor, block);
              }
            });
          }}
        />
      </Slate>
    </React.Fragment>
  );
};

EditorContainer.propTypes = {
  initialValues: PropTypes.string,
  onChangeValue: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeValue: evt => {
      dispatch(changeValue(evt));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditorContainer);
