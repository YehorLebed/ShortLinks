import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

import { Container, Navbar, Loader } from './components'

import 'materialize-css';

const App = () => {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) return <Loader />

  return (
    <Router>
      <AuthContext.Provider value={{ token, userId, isAuthenticated, login, logout }}>
        {isAuthenticated && <Navbar />}
        <Container>
          {
            routes
          }
        </Container>
      </AuthContext.Provider>
    </Router>
  )
}

export default App;