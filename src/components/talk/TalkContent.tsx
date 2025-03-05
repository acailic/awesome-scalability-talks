import { useState, useEffect } from "react";
import { TTalk } from "../../lib/types";
import { getTalkContentByFileName } from "../../stores/talksStore";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { marked } from "marked";

type TalkContentProps = {
  talk: TTalk;
};

export function TalkContent({ talk }: TalkContentProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadContent() {
      if (!talk.fileName) return;

      setIsLoading(true);
      try {
        const talkContent = await getTalkContentByFileName(talk.fileName);
        setContent(talkContent);
        setError("");
      } catch (err) {
        console.error("Failed to load talk content", err);
        setError("Failed to load the talk content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [talk.fileName]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="talk-content">
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );
}

export default TalkContent;