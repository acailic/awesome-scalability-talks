import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DocsPage.css';

interface Doc {
  id: string;
  title: string;
  category: string;
  description: string;
}

const DocsPage: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // In a real application, this would fetch data from an API
    const fetchDocs = async () => {
      try {
        // Placeholder for API call
        // const response = await fetch('/api/docs');
        // const data = await response.json();

        // Mock data
        const mockDocs = [
          { id: '1', title: 'Scalable System Architecture', category: 'architecture', description: 'Principles of building scalable systems' },
          { id: '2', title: 'Database Sharding Techniques', category: 'database', description: 'Methods for horizontally partitioning data' },
          { id: '3', title: 'Load Balancing Strategies', category: 'infrastructure', description: 'Different approaches to load balancing' },
        ];

        setDocs(mockDocs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documentation:', error);
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const filteredDocs = filter === 'all'
    ? docs
    : docs.filter(doc => doc.category === filter);

  return (
    <div className="docs-container">
      <h1>Documentation</h1>

      <div className="filter-controls">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'architecture' ? 'active' : ''}
          onClick={() => setFilter('architecture')}
        >
          Architecture
        </button>
        <button
          className={filter === 'database' ? 'active' : ''}
          onClick={() => setFilter('database')}
        >
          Database
        </button>
        <button
          className={filter === 'infrastructure' ? 'active' : ''}
          onClick={() => setFilter('infrastructure')}
        >
          Infrastructure
        </button>
      </div>

      {loading ? (
        <p>Loading documentation...</p>
      ) : (
        <div className="docs-grid">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="doc-card">
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <Link to={`/docs/${doc.id}`} className="view-doc-btn">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocsPage;
