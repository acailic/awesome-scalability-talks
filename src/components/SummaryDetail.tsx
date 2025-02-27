import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { summaries } from '../data/summaries';
import '../styles/SummaryDetail.css';

const SummaryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const summary = summaries.find(s => s.id === id);

  if (!summary) {
    return (
      <div className="summary-not-found">
        <h2>Summary Not Found</h2>
        <p>Sorry, we couldn't find the summary you're looking for.</p>
        <Link to="/" className="back-link">Back to Summaries</Link>
      </div>
    );
  }

  return (
    <div className="summary-detail">
      <Link to="/" className="back-link">← Back to Summaries</Link>

      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${summary.youtubeId}`}
          title={summary.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="summary-content">
        <h1>{summary.title}</h1>

        <div className="meta-info">
          <span className="category-badge">{summary.category}</span>
          <span className="duration">{summary.duration}</span>
          <span className="date-added">Added on {new Date(summary.dateAdded).toLocaleDateString()}</span>
        </div>

        <div className="description">
          <h2>Description</h2>
          <p>{summary.description}</p>
        </div>

        <div className="key-points">
          <h2>Key Points</h2>
          <ul>
            {summary.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="tags-section">
          <h2>Tags</h2>
          <div className="tags">
            {summary.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetail;
