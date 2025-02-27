import React from 'react';
import { Link } from 'react-router-dom';
import { Summary } from '../types';
import '../styles/SummaryCard.css';

interface SummaryCardProps {
  summary: Summary;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <div className="summary-card">
      <div className="thumbnail">
        <img src={summary.thumbnailUrl} alt={summary.title} />
      </div>
      <div className="content">
        <h3>{summary.title}</h3>
        <div className="meta">
          <span className="author">{summary.author}</span>
          <span className="date">{new Date(summary.date).toLocaleDateString()}</span>
        </div>
        <p className="description">{summary.description}</p>
        <div className="tags">
          {summary.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <Link to={`/summary/${summary.id}`} className="read-more">
          Read Summary
        </Link>
      </div>
    </div>
  );
};

export default SummaryCard;
