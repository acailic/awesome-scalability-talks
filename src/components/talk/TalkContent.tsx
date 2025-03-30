import React, { useState, useEffect } from "react";
import { TTalk } from "../../lib/types";
import { getTalkContentByFileName } from "../../stores/talksStore";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { marked } from "marked";
import TextToSpeech from "../TextToSpeech";
import ShareButtons from "../share/ShareButtons";
import "../share/ShareButtons.css";

type TalkContentProps = {
  talk: TTalk;
};

export function TalkContent({ talk }: TalkContentProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [plainTextContent, setPlainTextContent] = useState<string>("");

  useEffect(() => {
    async function loadContent() {
      if (!talk.fileName) return;

      setIsLoading(true);
      setContent(null);
      setError(null);
      setPlainTextContent("");

      try {
        const talkContent = await getTalkContentByFileName(talk.fileName);
        const htmlContent = String(marked.parse(talkContent));
        setContent(htmlContent);

        // Create plain text version for text-to-speech
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        setPlainTextContent(tempDiv.textContent || "");
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
        <div className="talk-content__title-container">
          <h1 className="talk-content__title">{talk.title}</h1>
          <ShareButtons
            title={talk.title}
            url={window.location.href}
          />
        </div>
        <div className="talk-content__category">{talk.category}</div>
        {content && <TextToSpeech text={plainTextContent} />}
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
