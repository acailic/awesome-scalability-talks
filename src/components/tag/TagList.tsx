import { useCallback, useEffect, useState } from "react";
import ArticleTagList from "./ArticleTagList";
import DocumentationTagList from "./DocumentationTagList";
import TalkTagList from "./TalkTagList";
import { useTabStore } from "../../stores/tabStore";
import { TAB } from "../../stores/tabs";
import "./TagList.css";

export default function TagList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeTab, setActiveTab, isInitialized, initializationTab } = useTabStore();

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleArticlesTabClick = useCallback(() => {
    setActiveTab(TAB.ARTICLES);
  }, [setActiveTab]);

  const handleDocumentationTabClick = useCallback(() => {
    setActiveTab(TAB.DOCUMENTATION);
  }, [setActiveTab]);

  const handleTalksTabClick = useCallback(() => {
    setActiveTab(TAB.TALKS);
  }, [setActiveTab]);

  useEffect(() => {
    initializationTab();
  }, [initializationTab]);

  return (
    <div className="tag-list-container">
      <div className="tag-list-header">
        <h5 className="tag-list__title">Filter by Tags</h5>
        <button
          className="tag-list-toggle"
          onClick={toggleExpansion}
          aria-label={isExpanded ? "Collapse tags" : "Expand tags"}
        >
          <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`}></span>
        </button>
      </div>
      {isExpanded && (
        <>
          <div className="tag-tabs">
            <button
              className={`tag-tab ${activeTab === TAB.ARTICLES ? "tag-tab--active" : ""}`}
              onClick={handleArticlesTabClick}
            >
              Articles
            </button>
            <button
              className={`tag-tab ${activeTab === TAB.DOCUMENTATION ? "tag-tab--active" : ""}`}
              onClick={handleDocumentationTabClick}
            >
              Documentation
            </button>
            <button
              className={`tag-tab ${activeTab === TAB.TALKS ? "tag-tab--active" : ""}`}
              onClick={handleTalksTabClick}
            >
              Talks
            </button>
          </div>
          <ul className="tag-list">
            {isInitialized && (
              activeTab === TAB.ARTICLES ? (
                <ArticleTagList />
              ) : activeTab === TAB.DOCUMENTATION ? (
                <DocumentationTagList />
              ) : (
                <TalkTagList />
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
