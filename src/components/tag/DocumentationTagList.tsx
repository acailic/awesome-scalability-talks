import { useDocumentationStore } from "../../stores/documentationStore";
import { useCallback, useMemo } from "react";

export default function DocumentationTagList() {
  const documentationTags = useMemo(() => {
    return useDocumentationStore.getState().getTagsList();
  }, []);

  const selectedDocumentationTag = useDocumentationStore((state: any) => state.selectedTag);
  const handleTagClick = useCallback((tag: string) => {
    useDocumentationStore.getState().selectTag(tag);
  }, []);

  return (
    <div className="tag-items">
      {documentationTags.map((tag: string) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`tag-item ${selectedDocumentationTag === tag ? 'tag-item--active' : ''}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
