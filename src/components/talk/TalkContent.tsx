import React, { useState, useEffect } from "react";
import { TTalk } from "../../lib/types";
import { getTalkContentByFileName } from "../../stores/talksStore";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { marked } from "marked";

type TalkContentProps = {
  talk: TTalk;
};

export function TalkContent({ talk }: TalkContentProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      if (!talk.fileName) return;

      setIsLoading(true);
      setContent(null);
      setError(null);

      try {
        const talkContent = await getTalkContentByFileName(talk.fileName);
        setContent(String(marked.parse(talkContent)));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(`Failed to load talk content: ${errorMessage}`);
        console.error("Failed to load talk content:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [talk.fileName]);

  return (
    <div className="talk-content">
      <header className="talk-content__header">
        <h1 className="talk-content__title">{talk.title}</h1>
        <div className="talk-content__category">{talk.category}</div>
      </header>

      <div className="talk-content__body">
        {isLoading && <p>Loading content...</p>}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <p>Path: {talk.fileName ? `/src/talks/${talk.fileName}` : 'N/A'}</p>
          </div>
        )}
        {content ? (
          <div className="markdown-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : !isLoading && !error ? (
          <p>No content available for this talk.</p>
        ) : null}
      </div>
    </div>
  );
}

export default TalkContent;
