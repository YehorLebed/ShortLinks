import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const onLogout = e => {
    e.preventDefault();
    logout();
    history.push('/');
  }

  return (
    <nav className="teal lighten-1">
      <div className="nav-wrapper container">
        <NavLink to="/" className="brand-logo">Short links</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать ссылку</NavLink></li>
          <li><NavLink to="/links">Мои ссылки</NavLink></li>
          <li><NavLink to="/" onClick={onLogout}>Выход</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;