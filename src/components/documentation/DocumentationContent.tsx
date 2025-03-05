import React, { useState, useEffect } from "react";
import { TDocumentation } from "../../lib/types";
import { getDocumentationContentByFileName } from "../../stores/documentationStore";
import { marked } from "marked";
import TextToSpeech from "../TextToSpeech";

type DocumentationContentProps = {
  doc: TDocumentation;
};

export default function DocumentationContent({ doc }: DocumentationContentProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [plainTextContent, setPlainTextContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      // Reset content when a new document is selected
      setLoading(true);
      setContent(null);
      setError(null);
      setPlainTextContent("");

      try {
        // If document already has content, use it
        if (doc.content) {
          const htmlContent = String(marked.parse(doc.content));
          setContent(htmlContent);
          // Create plain text version for text-to-speech
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          setPlainTextContent(`${doc.title}. ${tempDiv.textContent || ""}`);
        }
        // Otherwise fetch content if fileName is provided
        else if (doc.fileName) {
          console.log(`Fetching content for: ${doc.fileName}`);
          const fetchedContent = await getDocumentationContentByFileName(doc.fileName);
          if (!fetchedContent) {
            throw new Error("Content was empty");
          }
          const htmlContent = String(marked.parse(fetchedContent));
          setContent(htmlContent);
          // Create plain text version for text-to-speech
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          setPlainTextContent(`${doc.title}. ${tempDiv.textContent || ""}`);
          console.log("Content successfully loaded and parsed");
        } else {
          console.warn("No content or filename provided for document:", doc.title);
          setContent(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(`Failed to load documentation content: ${errorMessage}`);
        console.error(`Error fetching content for ${doc.fileName}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [doc]); // Only depend on doc, not content

  return (
    <div className="documentation-content">
      <header className="documentation-content__header">
        <h1 className="documentation-content__title">{doc.title}</h1>
        <div className="documentation-content__category">{doc.category}</div>
        {content && <TextToSpeech text={plainTextContent} />}
      </header>

      <div className="documentation-content__body">
        {loading && <p>Loading content...</p>}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <p>Path: {doc.fileName ? `/src/react-learning/${doc.fileName}` : 'N/A'}</p>
          </div>
        )}
        {content ? (
          <div className="markdown-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : !loading && !error ? (
          <p>No content available for this documentation.</p>
        ) : null}
      </div>
    </div>
  );
}
