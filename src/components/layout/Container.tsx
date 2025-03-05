import ArticleList from "../article/ArticleList";
import DocumentationList from "../documentation/DocumentationList";
import TalkList from "../talk/TalkList";
import Header from "./Header";
import TagList from "../tag/TagList";
import { useTabStore } from "../../stores/tabStore";
import TabIcon from "../icon/TabIcon";
import { ICONS } from "../icon/Icons";
import { useCallback, useEffect } from "react";
import { TAB } from "../../stores/tabs";

export default function Container() {
  const { activeTab, setActiveTab, isInitialized, initializationTab } = useTabStore();

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
          className={`tab ${activeTab === TAB.TALKS ? "tab--active" : ""}`}
          onClick={() => handleTabClick(TAB.TALKS)}
        >
         <TabIcon iconName={ICONS.HEART} alt="Talks icon" />
          Talks
        </button>
        <button
          className={`tab ${activeTab === TAB.ARTICLES ? "tab--active" : ""}`}
          onClick={() => handleTabClick(TAB.ARTICLES)}
        >
          <TabIcon iconName={ICONS.STAR} alt="Articles icon" />
          Articles
        </button>
        <button
          className={`tab ${activeTab === TAB.DOCUMENTATION ? "tab--active" : ""}`}
          onClick={() => handleTabClick(TAB.DOCUMENTATION)}
        >
         <TabIcon iconName={ICONS.COIN} alt="Documentation icon" />
          React Documentation
        </button>

      </div>
      <TagList />
      <div className="content">
       {isInitialized && (
          activeTab === TAB.ARTICLES ? (
            <ArticleList key="articles" />
          ) : activeTab === TAB.DOCUMENTATION ? (
            <DocumentationList key="documentation" />
          ) : (
            <TalkList key="talks" />
          )
        )}
      </div>
    </div>
  );
}
