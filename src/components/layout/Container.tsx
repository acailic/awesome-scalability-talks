import ArticleList from "../article/ArticleList";
import DocumentationList from "../documentation/DocumentationList";
import Header from "./Header";
import TagList from "../tag/TagList";
import { useTabStore } from "../../stores/tabStore";
import TabIcon from "../icon/TabIcon";
import { ICONS } from "../icon/Icons";
import { useCallback, useEffect } from "react";
import { TAB } from "../../stores/tabs";

export default function Container() {
  const { activeTab, setActiveTab , isInitialized, initializationTab} = useTabStore();

// Set default tab on initial render
  useEffect(() => {
    initializationTab();
  }, [initializationTab]);

 const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, [setActiveTab]);

  return (
    <div className="container">
      <Header />

      <div className="tabs">
        <button
          className={`tab ${activeTab === "articles" ? "tab--active" : ""}`}
          onClick={()=>handleTabClick("articles")}
        >
          <TabIcon iconName={ICONS.STAR} alt="Talks icon" />
          Talks
        </button>
        <button
          className={`tab ${activeTab === "documentation" ? "tab--active" : ""}`}
          onClick={()=>handleTabClick("documentation")}
        >
         <TabIcon iconName={ICONS.COIN} alt="Talks icon" />
          React Documentation
        </button>
      </div>

      <TagList />

      <div className="content">
       {isInitialized && (
          activeTab === TAB.ARTICLES ? (
            <ArticleList key="articles" />
          ) : (
            <DocumentationList key="documentation" />
          )
        )}
      </div>
    </div>
  );
}
