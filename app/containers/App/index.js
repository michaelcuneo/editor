/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
// import Footer from 'components/Footer';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  position: relative;
  max-width: 100vw;
  min-height: 100vh;
  height: 100vh;
  background: #fbfbf8;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding-bottom: 3em;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Content>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Content>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
