import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDocContent, fetchDocFile, DocItem } from '../services/dataService';
import '../styles/DocContentPage.css';
import ReactMarkdown from 'react-markdown';

const DocContentPage: React.FC = () => {
  const { sectionId, docId } = useParams<{ sectionId: string, docId: string }>();
  const [docItem, setDocItem] = useState<DocItem | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocContent = async () => {
      if (!sectionId || !docId) return;

      try {
        setLoading(true);
        setError(null);

        // First, get the document metadata
        const items = await fetchDocContent(sectionId);
        const foundItem = items.find(item => item.id === docId);

        if (!foundItem) {
          throw new Error('Document not found');
        }

        setDocItem(foundItem);

        // Now fetch the actual content
        const fileContent = await fetchDocFile(foundItem.fileName);
        setContent(fileContent);
      } catch (error) {
        console.error(`Error loading document ${docId}:`, error);
        setError(`Failed to load document. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    loadDocContent();
  }, [sectionId, docId]);

  return (
    <div className="doc-content-page">
      <Link to={`/docs/${sectionId}`} className="back-link">
        ← Back to {sectionId} Documentation
      </Link>

      {loading ? (
        <div className="loading-indicator">Loading document...</div>
      ) : error ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : docItem ? (
        <div className="doc-content">
          <header className="doc-header">
            <h1>{docItem.title}</h1>
            {docItem.tags && docItem.tags.length > 0 && (
              <div className="doc-tags">
                {docItem.tags.map(tag => (
                  <span key={tag} className="doc-tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          <div className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="doc-not-found">Document not found</div>
      )}
    </div>
  );
};

export default DocContentPage;
