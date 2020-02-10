/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ParsedContent from 'components/ParsedContent';

import EditorContainer from 'containers/EditorContainer';

import { Box, Text } from 'rebass';
import { makeSelectValue } from 'containers/App/selectors';

function HomePage({ value }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Slate Based Editor Dev v0.1.0</title>
        <meta name="description" content="A University of Newcastle project." />
      </Helmet>
      <Box p={3}>
        <Text fontSize={['14pt']}>Slate based Editor Dev 0.1.0</Text>
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
        <EditorContainer initialValues="<p>Test Data</p>" />
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
              theme the editor HTML result to any project.
            </p>
          </Box>
          <Box p={2}>
            <ParsedContent content={value} />
          </Box>
        </Box>
        <Box
          style={{ border: '2px solid #c0c0c0', borderRadius: '10px' }}
          p={2}
        >
          <Box p={2}>
            <h3>Post Content Loaded from AWS</h3>
          </Box>
          <Box p={2}>
            <ParsedContent content={value} />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  value: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  value: makeSelectValue(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
