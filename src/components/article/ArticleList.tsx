import ArticleItem from "./ArticleItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useArticlesStore } from "../../stores/articlesStore";
import { useState, useMemo } from "react";
import ArticleContent from "./ArticleContent";
import { PaginationControls } from "../PaginationControls";
import { TArticle } from "../../lib/types";

export default function ArticleList() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  // Use the Zustand store hooks to properly subscribe to state changes
  const isLoading = useArticlesStore(state => state.isLoading);
  const errorMessage = useArticlesStore(state => state.errorMessage);
  const filteredArticles = useArticlesStore(state => state.getFilteredArticles());

  // Process articles to match the expected type in components
  const processedArticles = useMemo(() => {
    return filteredArticles.map(article => ({
      id: Number(article.id) || 0,
      title: article.title,
      summary: article.content?.substring(0, 100) || "",
      content: article.content || "",
      author: article.author || "",
      publishedDate: article.date || "",
      tags: article.tags,
    } as TArticle));
  }, [filteredArticles]);

  const totalPages = Math.ceil(processedArticles.length / 10);
  const paginatedArticles = useMemo(() =>
    processedArticles.slice((page - 1) * 10, page * 10),
    [processedArticles, page]
  );

  const handleSelectArticle = (id: number) => {
    setSelectedArticleId(id);
  };

  const selectedArticle = selectedArticleId
    ? processedArticles.find(article => article.id === selectedArticleId)
    : null;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedArticleId(null); // Reset selection when page changes
  };

  return (
    <div className="article-container">
      <div className="article-sidebar">
        <h2 className="article-sidebar__title">
          Talks
        </h2>

        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <ul className="article-list">
          {paginatedArticles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              onSelect={handleSelectArticle}
              isSelected={selectedArticleId === article.id}
            />
          ))}
        </ul>

        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
