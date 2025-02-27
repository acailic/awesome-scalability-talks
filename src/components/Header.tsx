import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <div className="logo">
        <Link to="/">
          <img src="/logo.svg" alt="Cozy React Learning Hub" />
          <span>Cozy React Hub</span>
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/docs" className="nav-link">Learn React</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header;
