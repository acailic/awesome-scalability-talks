import DocumentationItem from "./DocumentationItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useDocumentationStore } from "../../stores/documentationStore";
import { useState, useMemo } from "react";
import DocumentationContent from "./DocumentationContent";

export default function DocumentationList() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Use useMemo to memoize the selectors
  const isLoading = useMemo(() => useDocumentationStore.getState().isLoading, []);
  const errorMessage = useMemo(() => useDocumentationStore.getState().errorMessage, []);
  const filteredDocs = useMemo(() => useDocumentationStore.getState().getFilteredDocumentationItems(), []);

  const handleSelectDoc = (id: string) => {
    setSelectedDocId(id);
  };

  const selectedDoc = selectedDocId
    ? filteredDocs.find(doc => doc.id === selectedDocId)
    : null;

  return (
    <div className="documentation-container">
      <div className="documentation-sidebar">
        <h2 className="documentation-sidebar__title">React Documentation</h2>

        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <ul className="documentation-list">
          {filteredDocs.map((doc) => (
            <DocumentationItem
              key={doc.id}
              doc={doc}
              onSelect={handleSelectDoc}
              isSelected={selectedDocId === doc.id}
            />
          ))}
        </ul>
      </div>

      <div className="documentation-content-container">
        {selectedDoc ? (
          <DocumentationContent doc={selectedDoc} />
        ) : (
          <div className="documentation-content-placeholder">
            <h2>Select a document to read</h2>
            <p>Choose a document from the sidebar to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
