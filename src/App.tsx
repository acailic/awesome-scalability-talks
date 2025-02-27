import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocsPage from './pages/DocsPage';
import DocSectionPage from './pages/DocSectionPage';
import DocContentPage from './pages/DocContentPage';
import './App.css';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
      <HomePage />
  );
}

export default App;
