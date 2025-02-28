import ArticleItem from "./ArticleItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useArticlesStore } from "../../stores/articlesStore";
import { useState, useMemo } from "react";
import ArticleContent from "./ArticleContent";

export default function ArticleList() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Use useMemo to memoize the selectors
  const isLoading = useMemo(() => useArticlesStore.getState().isLoading, []);
  const errorMessage = useMemo(() => useArticlesStore.getState().errorMessage, []);
  const filteredArticles = useMemo(() => useArticlesStore.getState().getFilteredArticles(), []);

  const handleSelectArticle = (id: number) => {
    setSelectedArticleId(id);
  };

  const selectedArticle = selectedArticleId
    ? filteredArticles.find(article => article.id === selectedArticleId)
    : null;

  return (
    <div className="article-container">
      <div className="article-sidebar">
        <h2 className="article-sidebar__title">

          Talks
        </h2>

        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <ul className="article-list">
          {filteredArticles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              onSelect={handleSelectArticle}
            />
          ))}
        </ul>
      </div>

      <div className="article-content-container">
        {selectedArticle ? (
          <ArticleContent article={selectedArticle} />
        ) : (
          <div className="article-content-placeholder">
            <h2>Select an article to read</h2>
            <p>Choose an article from the sidebar to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
