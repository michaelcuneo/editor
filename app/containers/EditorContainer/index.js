import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { Toolbar } from './Components';

// Nodes
import { deserialize, serialize } from './Node';
import Element from './Element';
import Leaf from './Leaf';

// Buttons
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';
import { LinkButton, withLinks } from './LinkButton';
import { ImageButton, withImages } from './ImageButton';

export function EditorContainer({ mode, initialValues }) {
  const intialDocumentDeserialized = new DOMParser().parseFromString(initialValues, 'text/html');
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

  const color = mode ? '#000' : '#fff';
  const borderColour = mode ? '#ec184a' : '#fff';

  const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  }  

  return (
    <React.Fragment>
      <Slate
        editor={editor}
        value={value}
        // eslint-disable-next-line no-shadow
        onChange={value => {
          setValue(value);
          localStorage.setItem('content', serialize(value));
        }}
      >
        <Toolbar mode={mode}>
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
          <BlockButton editor={editor} format="block-quote" icon="format_quote" />
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
          <LinkButton />
          <ImageButton />
        </Toolbar>
        <Editable
          style={{
            padding: '1em',
            color,
            borderLeft: `2px solid ${borderColour}`,
            borderBottom: `2px solid ${borderColour}`,
            borderRight: `2px solid ${borderColour}`,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder=""
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}  
        />
      </Slate>,
      <div style={{ margin: '0 auto', width: '90vw' }}>
        {console.log(editor)}
      </div>
    </React.Fragment>
  );
}

EditorContainer.propTypes = {
  initialValues: PropTypes.string,
  mode: PropTypes.bool,
};

export default EditorContainer;
