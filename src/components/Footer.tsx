import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Cozy React Learning Hub</h3>
          <p>Learn React in a fun, cozy environment</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/docs">Learn React</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React Docs</a></li>
            <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">TypeScript Docs</a></li>
            <li><Link to="/docs/contributing">How to Contribute</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cozy React Learning Hub. Made with ❤️ and React.</p>
      </div>
    </footer>
  );
};

export default Footer;
