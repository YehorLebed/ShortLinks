import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage, CreatePage, DetailPage, AuthPage } from './pages';

export const useRoutes = isAuthenticated => {
  // If user is authenticated return the following routes
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/links" component={LinksPage} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/detail/:id" component={DetailPage} />
        <Redirect to="/create" />
      </Switch>
    );
  }

  // If user is NOT authenticated return the following routes
  return (
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <Redirect to="/" />
    </Switch>
  );
}