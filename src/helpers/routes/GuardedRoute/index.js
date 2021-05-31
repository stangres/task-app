import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks';

export default function GuardedRoute({ children, redirectTo = '/login', ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ?
          children
          :
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location }
            }}
          />
      }
    />
  );
}