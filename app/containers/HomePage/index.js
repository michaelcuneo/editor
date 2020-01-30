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
          This editor is built on top of Slate v0.57.1.
        </Text>
        <Text>
          You can use plain text, rich text, or HTML. The serializer will handle
          all three.
        </Text>
      </Box>
      <Box p={3}>
        <EditorContainer initialValues="<p>Test Data</p>" />
      </Box>
      <Box p={3}>{value}</Box>
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
