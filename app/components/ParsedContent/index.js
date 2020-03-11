import React from 'react';
import PropTypes from 'prop-types';

import S3Image from 'components/S3Image';

import parse from 'html-react-parser';

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
        return null;
      },
    });

  return ParsedPost;
};

ParsedContent.propTypes = {
  content: PropTypes.string,
};

export default ParsedContent;
