import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDocContent, DocItem } from '../services/dataService';
import '../styles/DocSectionPage.css';

const DocSectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [items, setItems] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocContent = async () => {
      if (!sectionId) return;

      try {
        setLoading(true);
        setError(null);

        const contentItems = await fetchDocContent(sectionId);
        setItems(contentItems);
      } catch (error) {
        console.error(`Error loading content for section ${sectionId}:`, error);
        setError(`Failed to load content for this section. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    loadDocContent();
  }, [sectionId]);

  return (
    <div className="doc-section-page">
      <Link to="/docs" className="back-link">← Back to All Documentation</Link>

      {loading ? (
        <div className="loading-indicator">Loading content...</div>
      ) : error ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : items.length === 0 ? (
        <div className="no-content-message">
          <p>No content available for this section.</p>
        </div>
      ) : (
        <div className="doc-items-grid">
          {items.map(item => (
            <Link to={`/docs/${sectionId}/${item.id}`} key={item.id} className="doc-item-card">
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {item.tags && item.tags.length > 0 && (
                <div className="doc-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="doc-tag">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocSectionPage;
