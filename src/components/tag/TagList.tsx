
import { useCallback, useEffect, useMemo } from "react";
import ArticleTagList from "./ArticleTagList";
import DocumentationTagList from "./DocumentationTagList";
import { useTabStore } from "../../stores/tabStore";
import "./TagList.css";

export default function TagList() {
  const { activeTab, setActiveTab, isInitialized, initializationTab } = useTabStore();

  const handleArticlesTabClick = useCallback(() => {
    setActiveTab("articles");
  }, [setActiveTab]);

  const handleDocumentationTabClick = useCallback(() => {
    setActiveTab("documentation");
  }, [setActiveTab]);

  useEffect(() => {
    initializationTab();
  }, [initializationTab]);

  return (
    <div className="tag-list-container">
      <h3 className="tag-list__title">Filter by Tags</h3>

      <div className="tag-tabs">
        <button
          className={`tag-tab ${activeTab === "articles" ? "tag-tab--active" : ""}`}
          onClick={handleArticlesTabClick}
        >
        </button>
        <button
          className={`tag-tab ${activeTab === "documentation" ? "tag-tab--active" : ""}`}
          onClick={handleDocumentationTabClick}
        >
        </button>
      </div>

      <ul className="tag-list">
        {isInitialized && (activeTab === "articles" ? (
          <ArticleTagList />
        ) : (
          <DocumentationTagList />
        ))}
      </ul>
    </div>
  );
}
