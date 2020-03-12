/* eslint-disable no-param-reassign */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { Button } from 'primereact/button';

import ParsedContent from 'components/ParsedContent';

import EditorContainer from 'containers/EditorContainer';

import { Box, Text } from 'rebass';
import { makeSelectValue } from 'containers/App/selectors';
import { VERSION } from 'containers/App/constants';
import PostContainer from 'containers/PostContainer';
import saga from './saga';
import reducer from './reducer';

import { changeEdit, savePost } from './actions';
import { makeSelectEdit } from './selectors';

import { listPosts } from '../../../src/graphql/queries';
import { onCreateOrUpdateOrDelete } from '../../../src/graphql/customSubscriptions';

const key = 'home';

const HomePage = ({ value, post, onChangeEdit, onSavePost }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (post !== undefined) {
      onChangeEdit(true);
    } else {
      onChangeEdit(false);
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    onSavePost();
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Slate Based Editor Dev {VERSION}</title>
        <meta name="description" content="A University of Newcastle project." />
      </Helmet>
      <Box p={3}>
        <Text fontSize={['14pt']}>Slate based Editor Dev {VERSION}</Text>
      </Box>
      <Box p={3}>
        <Text fontSize={['12pt']}>
          This editor is built on top of Slate v0.57.1 & React-Boilerplate
        </Text>
        <Text fontSize={['12pt']}>
          Content is edited locally, and saved to an AWS Serverless Stack.
        </Text>
      </Box>
      <Box p={3}>
        <form key="Form" onSubmit={handleSubmit}>
          <EditorContainer initialValues="<p>Add your post here.</p>" />
          <Button
            type="submit"
            label="Submit Post"
            className="p-button-success"
            icon="pi pi-save"
            iconPos="right"
          />
        </form>
      </Box>
      <Box p={3}>
        <Box
          style={{ border: '2px solid #c0c0c0', borderRadius: '10px' }}
          p={2}
          mb={3}
        >
          <Box p={2}>
            <h3>Raw Data</h3>
          </Box>
          <Box p={2}>{value}</Box>
        </Box>
        <Box
          style={{ border: '2px solid #c0c0c0', borderRadius: '10px' }}
          p={2}
          mb={3}
        >
          <Box p={2}>
            <h3>Parsed Data</h3>
            <p>
              The parsed content can be styled by the ParsedContent component to
              theme the editor HTML result to any project. ParsedContent
              component will also handle any custom components, like @Mentions.
            </p>
          </Box>
          <Box p={2}>{value && <ParsedContent content={value} />}</Box>
        </Box>
        <Box
          style={{ border: '2px solid #c0c0c0', borderRadius: '10px' }}
          p={2}
        >
          <Box p={2}>
            <h3>Posts loaded from AWS</h3>
            <Connect
              key="CategoriesConnector"
              query={graphqlOperation(listPosts, {
                limit: 100,
              })}
              subscription={graphqlOperation(onCreateOrUpdateOrDelete)}
              onSubscriptionMsg={(
                prev,
                { addedPost, editedPost, deletePost },
              ) => {
                if (addedPost) {
                  prev.listPosts.items.push(addedPost);
                } else if (editedPost) {
                  prev.listPosts.items = prev.listPosts.items.map(thisPost =>
                    thisPost.id === editedPost.id ? editedPost : thisPost,
                  );
                } else if (deletePost) {
                  prev.listPosts.items = prev.listPosts.items.filter(
                    thisPost => thisPost.id !== deletePost.id,
                  );
                }
                return prev;
              }}
            >
              {({ data, loading, error }) => {
                if (error) return <h3 key="Error">Error</h3>;
                if (loading || !data) return <h3>No Posts to load</h3>;
                return [
                  data.listPosts.items.map(item => (
                    <PostContainer key={item.id} post={item} />
                  )),
                ];
              }}
            </Connect>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  value: PropTypes.string,
  post: PropTypes.object,
  // edit: PropTypes.bool,
  onSavePost: PropTypes.func,
  onChangeEdit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  edit: makeSelectEdit(),
  value: makeSelectValue(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEdit: evt => dispatch(changeEdit(evt)),
    onSavePost: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(savePost());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
