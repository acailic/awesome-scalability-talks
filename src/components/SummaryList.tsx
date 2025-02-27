import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { summaries } from '../data/summaries';
import { VideoCategory, Filter } from '../types';
import '../styles/SummaryList.css';

const SummaryList: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({
    categories: [],
    searchTerm: '',
    tags: []
  });

  const availableCategories = Object.values(VideoCategory);
  const availableTags = [...new Set(summaries.flatMap(summary => summary.tags))];

  const filteredSummaries = summaries.filter(summary => {
    // Filter by category
    if (filter.categories.length > 0 && !filter.categories.includes(summary.category)) {
      return false;
    }

    // Filter by search term
    if (filter.searchTerm && !summary.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) &&
        !summary.description.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by tags
    if (filter.tags.length > 0 && !summary.tags.some(tag => filter.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  const handleCategoryChange = (category: VideoCategory) => {
    setFilter(prevFilter => {
      const categories = prevFilter.categories.includes(category)
        ? prevFilter.categories.filter(c => c !== category)
        : [...prevFilter.categories, category];

      return { ...prevFilter, categories };
    });
  };

  const handleTagChange = (tag: string) => {
    setFilter(prevFilter => {
      const tags = prevFilter.tags.includes(tag)
        ? prevFilter.tags.filter(t => t !== tag)
        : [...prevFilter.tags, tag];

      return { ...prevFilter, tags };
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      searchTerm: event.target.value
    }));
  };

  return (
    <div className="summary-list-container">
      <div className="filter-panel">
        <h2>Filters</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search summaries..."
            value={filter.searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-section">
          <h3>Categories</h3>
          <div className="category-filters">
            {availableCategories.map(category => (
              <label key={category} className="filter-item">
                <input
                  type="checkbox"
                  checked={filter.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Tags</h3>
          <div className="tag-filters">
            {availableTags.map(tag => (
              <label key={tag} className="filter-item">
                <input
                  type="checkbox"
                  checked={filter.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="summaries-grid">
        {filteredSummaries.length > 0 ? (
          filteredSummaries.map(summary => (
            <Link to={`/summary/${summary.id}`} key={summary.id} className="summary-card">
              <div className="thumbnail">
                <img src={summary.thumbnailUrl} alt={summary.title} />
                <span className="duration">{summary.duration}</span>
              </div>
              <div className="card-content">
                <h3>{summary.title}</h3>
                <span className="category-badge">{summary.category}</span>
                <p className="description">{summary.description.substring(0, 100)}...</p>
                <div className="tags">
                  {summary.tags.slice(0, 3).map(tag => (
                    <span className="tag" key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <h3>No summaries found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryList;
