import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function RedirectRoute({ redirectTo = '/' }) {
  return (
    <Route path="*"
           render={(props) => <Redirect to={redirectTo} />}
    />
  );
}