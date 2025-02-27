import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SummaryDetailPage from './pages/SummaryDetailPage';
import DocsPage from './pages/DocsPage';
import DocDetailPage from './pages/DocDetailPage';
import AboutPage from './pages/AboutPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/summary/:id" element={<SummaryDetailPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/:id" element={<DocDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
