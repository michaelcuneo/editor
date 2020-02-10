import React from 'react';
import PropTypes from 'prop-types';
import { Transforms } from 'slate';

import { css } from 'emotion';

import { putS3 } from 'utils/awsLib';
import { S3Image } from 'aws-amplify-react';

import { Button, Icon } from './Components';

export const withImages = editor => {
  const { insertData, isVoid } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = element =>
    element.type === 'image' ? true : isVoid(element);

  // eslint-disable-next-line no-param-reassign
  editor.insertData = data => {
    insertData(data);
  };

  return editor;
};

export const ImageElement = ({ attributes, children, element }) => [
  // console.log(element),
  <div {...attributes}>
    <div contentEditable={false}>
      <S3Image
        {...attributes}
        imgKey={element.src}
        alt={element.src}
        className={css`
          display: block;
          max-width: 100vw;
          width: auto;
          max-height: 20em;
        `}
      />
    </div>
    {children}
  </div>,
];

ImageElement.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  element: PropTypes.object,
};

export const ImageButton = editor => {
  const inputOpenFileRef = React.createRef();

  const showOpenFileDlg = () => {
    const src = inputOpenFileRef.current.click();
    return src;
  };

  const handleClick = () => {
    const src = showOpenFileDlg();
    return src;
  };

  const uploadS3 = file => [
    putS3(`${file.name}`, file, file.type)
      .then(result => result)
      .catch(err => err),
  ];

  const insertImage = src => {
    const text = { text: '' };
    const image = { type: 'image', src, children: [text] };
    Transforms.insertNodes(editor, image);
  };

  const handleFileChange = event => {
    uploadS3(event.target.files[0]);
    const src = event.target.files[0].name;
    insertImage(src);
  };

  return (
    <React.Fragment>
      <Button onMouseDown={() => handleClick()}>
        <Icon>image</Icon>
      </Button>
      <input
        type="file"
        ref={inputOpenFileRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </React.Fragment>
  );
};
