/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Hub } from 'aws-amplify';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

import { authLogin, authLogout } from './actions';

const key = 'AuthManager';

export function AuthManager({ children, onLoggedIn, onLoggedOut }) {
  useInjectSaga({ key, saga });

  useEffect(() => {
    Hub.listen('auth', data => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        onAuthEvent(payload);
      }
    });
  }, []);

  const onAuthEvent = payload => {
    const { event } = payload;

    // eslint-disable-next-line default-case
    switch (event) {
      case 'signIn':
        onLoggedIn(event);
        break;
      case 'signOut':
        onLoggedOut(event);
        break;
    }
  };

  return children;
}

AuthManager.propTypes = {
  children: PropTypes.element.isRequired,
  onLoggedIn: PropTypes.func,
  onLoggedOut: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoggedIn: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(authLogin(evt));
    },
    onLoggedOut: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(authLogout(evt));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(AuthManager);
