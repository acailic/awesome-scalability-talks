import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import HomePage from './pages/HomePage';
import GlobalStyle from './styles/GlobalStyle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
