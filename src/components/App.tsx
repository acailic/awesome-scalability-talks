import Container from "./layout/Container";
import Footer from "./layout/Footer";
import { useArticlesStore } from "../stores/articlesStore";
import { useDocumentationStore } from "../stores/documentationStore";
import { useEffect, useCallback } from "react";

function App() {
  // Use useCallback to memoize the fetch functions
  const fetchArticles = useCallback(() => {
    useArticlesStore.getState().fetchArticles();
  }, []);

  const fetchDocumentationItems = useCallback(() => {
    useDocumentationStore.getState().fetchDocumentationItems();
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchDocumentationItems();
  }, [fetchArticles, fetchDocumentationItems]);

  return (
    <div className="app">
      <Container />
      <Footer />
    </div>
  );
}

export default App;
