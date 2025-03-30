import Container from "./layout/Container";
import Footer from "./layout/Footer";
import { useArticlesStore } from "../stores/articlesStore";
import { useDocumentationStore } from "../stores/documentationStore";
import { useTalksStore } from "../stores/talksStore";
import { useTabStore } from "../stores/tabStore";
import { TAB } from "../stores/tabs";
import { useEffect, useCallback } from "react";

function App() {
  // Use useCallback to memoize the fetch functions
  const fetchArticles = useCallback(() => {
    useArticlesStore.getState().fetchArticles();
  }, []);

  const fetchDocumentationItems = useCallback(() => {
    useDocumentationStore.getState().fetchDocumentationItems();
  }, []);

  const fetchTalks = useCallback(() => {
    useTalksStore.getState().fetchTalks();
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchDocumentationItems();
    fetchTalks();
  }, [fetchArticles, fetchDocumentationItems, fetchTalks]);

  return (
    <div className="app">
      <Container />
      <Footer />
    </div>
  );
}

export default App;
