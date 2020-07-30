import { createContext } from 'react';

function empty() { }

export const AuthContext = createContext({
  token: null,
  userId: null,
  isAuthenticated: false,
  login: empty,
  logout: empty
});