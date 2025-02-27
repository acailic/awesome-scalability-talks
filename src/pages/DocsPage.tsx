import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DocsPage.css';
import { fetchDocSections, DocSection } from '../services/dataService';

const DocsPage: React.FC = () => {
  const [sections, setSections] = useState<DocSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSections = async () => {
      try {
        setLoading(true);
        setError(null);

        const sectionsData = await fetchDocSections();
        setSections(sectionsData);
      } catch (error) {
        console.error('Error loading doc sections:', error);
        setError('Failed to load documentation sections. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, []);

  return (
    <div className="docs-page">
      <h1>Documentation</h1>

      {loading ? (
        <div className="loading-indicator">Loading documentation...</div>
      ) : error ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : sections.length === 0 ? (
        <div className="no-docs-message">
          <p>No documentation available at the moment.</p>
        </div>
      ) : (
        <div className="docs-sections">
          {sections.map(section => (
            <div key={section.id} className="docs-section">
              <h2>{section.title}</h2>
              {section.description && <p className="section-description">{section.description}</p>}
              <Link to={`/docs/${section.id}`} className="section-link">
                Browse {section.title} Docs
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocsPage;
