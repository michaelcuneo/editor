import React from 'react';
import PropTypes from 'prop-types';

import { ImageElement } from './ImageButton';

const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'bold':
      return (
        <p>
          <strong {...attributes}>{children}</strong>
        </p>
      );
    case 'italic':
      return (
        <p>
          <i {...attributes}>{children}</i>
        </p>
      );
    case 'underline':
      return (
        <p>
          <u {...attributes}>{children}</u>
        </p>
      );
    case 'code':
      return (
        <p>
          <code {...attributes}>{children}</code>
        </p>
      );
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    case 'image':
      return <ImageElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

Element.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  element: PropTypes.object,
};

export default Element;
