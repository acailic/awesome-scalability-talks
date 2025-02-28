import { TDocumentation } from "../../lib/types";
import { getDocumentationContentByFileName} from "../../stores/documentationStore";
import { useEffect, useState } from "react";

type DocumentationContentProps = {
  doc: TDocumentation;
};

export default function DocumentationContent({ doc }: DocumentationContentProps) {
  const [content, setContent] = useState<string | null>(doc.content || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!content && doc.fileName) {
        setLoading(true);
        try {
          const fetchedContent = await getDocumentationContentByFileName(doc.fileName);
          setContent(fetchedContent);
          setError(null);
        } catch (err) {
          setError("Failed to load documentation content");
          console.error("Error fetching content:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchContent();
  }, [doc.fileName, content]);

  return (
    <div className="documentation-content">
      <header className="documentation-content__header">
        <h1 className="documentation-content__title">{doc.title}</h1>
        <div className="documentation-content__category">{doc.category}</div>
      </header>

      <div className="documentation-content__body">
        {loading && <p>Loading content...</p>}
        {error && <p className="error-message">{error}</p>}
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
