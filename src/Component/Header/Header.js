import React from 'react';
import './Header.css';
import logoUrl from '../../images/logo.PNG';

const Header = () => (
  <div className="header">
    <img src={logoUrl} alt="Tesla" />
  </div>
)

export default Header;