import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/DocDetailPage.css';

interface DocDetail {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  lastUpdated: string;
}

const DocDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doc, setDoc] = useState<DocDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real application, this would fetch data from an API based on the ID
    const fetchDocDetail = async () => {
      try {
        // Placeholder for API call
        // const response = await fetch(`/api/docs/${id}`);
        // const data = await response.json();

        // Mock data
        const mockDoc = {
          id,
          title: id === '1' ? 'Scalable System Architecture' :
                id === '2' ? 'Database Sharding Techniques' : 'Load Balancing Strategies',
          category: id === '1' ? 'architecture' :
                   id === '2' ? 'database' : 'infrastructure',
          content: `This is a detailed documentation about ${id === '1' ? 'scalable system architecture' :
                   id === '2' ? 'database sharding techniques' : 'load balancing strategies'}.
                   This would include comprehensive information, code examples, diagrams, and best practices.`,
          author: 'Tech Team',
          lastUpdated: '2023-10-15'
        };

        setDoc(mockDoc);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doc details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchDocDetail();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading document...</div>;
  }

  if (!doc) {
    return <div className="error">Document not found</div>;
  }

  return (
    <div className="doc-detail-container">
      <div className="doc-navigation">
        <Link to="/docs" className="back-to-docs">
          &larr; Back to Docs
        </Link>
      </div>

      <article className="doc-content">
        <header>
          <span className="doc-category">{doc.category}</span>
          <h1>{doc.title}</h1>
          <div className="doc-meta">
            <span>By {doc.author}</span>
            <span>Last updated: {doc.lastUpdated}</span>
          </div>
        </header>

        <div className="doc-body">
          <p>{doc.content}</p>

          {/* Example of what would be part of a real documentation page */}
          <h2>Introduction</h2>
          <p>This section would introduce the concept in detail.</p>

          <h2>Implementation</h2>
          <p>This section would describe how to implement this approach.</p>

          <h2>Best Practices</h2>
          <p>This section would cover recommended best practices.</p>

          <h2>Common Challenges</h2>
          <p>This section would address common issues and solutions.</p>
        </div>
      </article>

      <div className="related-docs">
        <h3>Related Documents</h3>
        <ul>
          {id !== '1' && <li><Link to="/docs/1">Scalable System Architecture</Link></li>}
          {id !== '2' && <li><Link to="/docs/2">Database Sharding Techniques</Link></li>}
          {id !== '3' && <li><Link to="/docs/3">Load Balancing Strategies</Link></li>}
        </ul>
      </div>
    </div>
  );
};

export default DocDetailPage;
