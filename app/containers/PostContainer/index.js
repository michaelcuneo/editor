import React from 'react';
import PropTypes from 'prop-types';
import ParsedContent from 'components/ParsedContent';

import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import { Button } from 'primereact/button';

import { Flex } from 'rebass';
import { deletePost } from '../../../src/graphql/mutations';
import DeletePost from './DeletePost';

const PostContainer = ({ post }) => (
  <Flex
    justifyContent="space-between"
    alignContent="center"
    key={post.id}
    p={2}
  >
    <ParsedContent content={post.data} />
    <Button
      type="edit"
      label="Edit"
      className="p-button-warning"
      icon="pi pi-pencil"
      iconPos="right"
    />
    <Connect mutation={graphqlOperation(deletePost)}>
      {({ mutation }) => <DeletePost onDelete={mutation} postId={post.id} />}
    </Connect>
  </Flex>
);

PostContainer.propTypes = {
  post: PropTypes.object,
};

export default PostContainer;
