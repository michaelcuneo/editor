import React, { useCallback, useMemo, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import useInjectReducer from 'utils/injectReducer';

import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

import { Toolbar } from './Components';

// Nodes
import { serialize, deserialize } from './Node';
import Element from './Element';
import Leaf from './Leaf';

// Buttons
import { MarkButton, toggleMark } from './MarkButton';
import BlockButton from './BlockButton';
import { LinkButton, withLinks } from './LinkButton';
import { ImageButton, withImages } from './ImageButton';

import reducer from './reducer';

import { changeSerializedValue } from './actions';

const reducerKey = 'EditorContainer';

const EditorContainer = ({ initialValues, onChangeSerializedValue }) => {
  // Init the Reducer
  useInjectReducer({ reducerKey, reducer });

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
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
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
          onChangeSerializedValue(serialize(newValue));
          localStorage.setItem('content', serialize(newValue));
        }}
      >
        <Toolbar>
          <MarkButton editor={editor} format="bold" icon="format_bold" />
          <MarkButton editor={editor} format="italic" icon="format_italic" />
          <MarkButton
            editor={editor}
            format="underline"
            icon="format_underlined"
          />
          <MarkButton editor={editor} format="code" icon="code" />
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
            padding: '1em',
            colour: 'white',
            borderLeft: `2px solid white`,
            borderBottom: `2px solid white`,
            borderRight: `2px solid white`,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder=""
          spellCheck
          autoFocus
          onKeyDown={event => {
            Object.keys(HOTKEYS).forEach(key => {
              if (isHotkey(key, event)) {
                event.preventDefault();
                const mark = HOTKEYS[key];
                toggleMark(editor, mark);
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
  onChangeSerializedValue: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSerializedValue: evt => {
      dispatch(changeSerializedValue(evt));
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
