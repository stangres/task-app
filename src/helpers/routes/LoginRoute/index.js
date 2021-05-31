import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks';

export default function LoginRoute({ children, redirectTo = '/', ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({location}) => (
        auth.isAuthenticated ?
          // Если пользователь уже аутентифицирован, тогда
          // перенаправляем по пути, указанному в адресной строке до того как он попал на страницу Login, либо в корень (по умолчанию).
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location }
            }}
          />
            :
          children
        )
      }
    />
  );
}