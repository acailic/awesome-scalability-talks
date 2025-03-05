import { useCallback, useEffect } from "react";
import ArticleTagList from "./ArticleTagList";
import DocumentationTagList from "./DocumentationTagList";
import TalkTagList from "./TalkTagList";
import { useTabStore } from "../../stores/tabStore";
import { TAB } from "../../stores/tabs";
import "./TagList.css";

export default function TagList() {
  const { activeTab, setActiveTab, isInitialized, initializationTab } = useTabStore();
  
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
      <h3 className="tag-list__title">Filter by Tags</h3>
      <div className="tag-tabs">
        <button
          className={`tag-tab ${activeTab === TAB.ARTICLES ? "tag-tab--active" : ""}`}
          onClick={handleArticlesTabClick}
        >
        </button>
        <button
          className={`tag-tab ${activeTab === TAB.DOCUMENTATION ? "tag-tab--active" : ""}`}
          onClick={handleDocumentationTabClick}
        >
        </button>
        <button
          className={`tag-tab ${activeTab === TAB.TALKS ? "tag-tab--active" : ""}`}
          onClick={handleTalksTabClick}
        >
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
    </div>
  );
}
