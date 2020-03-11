import React from 'react';
import PropTypes from 'prop-types';

import S3Image from 'components/S3Image';

import parse from 'html-react-parser';

const Span = ({ user }) => (
  <span
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
    @{user}
  </span>
);

Span.propTypes = {
  user: PropTypes.string,
};

const ParsedContent = props => {
  let ParsedPost = '';

  if (props.content !== null)
    ParsedPost = parse(props.content, {
      replace: domNode => {
        if (domNode.name && domNode.name === 'img') {
          return React.createElement(
            S3Image,
            {
              s3key: domNode.attribs.src,
              src: domNode.attribs.src,
            },
            null,
          );
        }
        if (domNode.name && domNode.name === 'mention') {
          return React.createElement(
            Span,
            {
              user: domNode.attribs.user,
            },
            null,
          );
        }
        return null;
      },
    });

  return ParsedPost;
};

ParsedContent.propTypes = {
  content: PropTypes.string,
};

export default ParsedContent;
