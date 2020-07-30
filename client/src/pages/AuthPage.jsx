import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const message = useMessage();
  const { request, loading, error, clearError } = useHttp();
  const { token, userId, isAuthenticated, login, logout } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onRegistration = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { email, password });
      message(data.message);
    } catch (error) { }
  }

  const onLogin = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { email, password });
      login(data.token, data.userId);
    } catch (error) { }
  }

  return (
    <div className="auth-page row">
      <div className="col s6 offset-s3">
        <h4>Сократи ссылку</h4>
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title teal-text text-lighten-1">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  className="validate"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  className="validate"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              onClick={onLogin} disabled={loading}>Войти</button>
            <button
              className="waves-effect waves-light btn"
              onClick={onRegistration} disabled={loading}>Зарегистрироваться</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthPage;