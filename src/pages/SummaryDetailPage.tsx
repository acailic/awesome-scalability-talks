import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchSummary } from '../services/dataService';
import { Summary } from '../types';
import '../styles/SummaryDetailPage.css';

const SummaryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        if (!id) {
          throw new Error('Summary ID is missing');
        }
        const data = await fetchSummary(id);
        if (!data) {
          throw new Error('Summary not found');
        }
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading summary...</div>;
  }

  if (error || !summary) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Failed to load summary'}</p>
        <Link to="/" className="back-button">Go back to homepage</Link>
      </div>
    );
  }

  return (
    <div className="summary-detail-page">
      <div className="summary-header">
        <Link to="/" className="back-link">
          ← Back to summaries
        </Link>
        <h1>{summary.title}</h1>
        <div className="meta-info">
          <span className="author">By {summary.author}</span>
          <span className="date">{new Date(summary.date).toLocaleDateString()}</span>
        </div>
        <div className="tags">
          {summary.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <a href={summary.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link">
          Watch Original Video
        </a>
      </div>

      <div className="summary-content">
        <ReactMarkdown>
          {summary.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SummaryDetailPage;
