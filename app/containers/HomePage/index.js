/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { EditorContainer } from 'containers/EditorContainer';

const initialValues = '<p>Here is some standard HTML</p>';

export function HomePage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Editor Development Test</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div style={{ padding: '20px', margin: '0 auto', width: '90vw' }}>
        Editor Dev 0.1.0
      </div>
      <div style={{ margin: '0 auto', width: '90vw' }}>
        <EditorContainer initialValues={initialValues} />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
