import { useArticlesStore } from "../../stores/articlesStore";
import { useCallback, useMemo } from "react";

export default function ArticleTagList() {
  const articleTags = useMemo(() => {
    return useArticlesStore.getState().getTagsList();
  }, []);

  const selectedArticleTag = useArticlesStore((state: any) => state.selectedTag);
  const handleTagClick = useCallback((tag: string) => {
    useArticlesStore.getState().selectTag(tag);
  }, []);

  return (
    <div className="tag-items">
      {articleTags.map((tag: string) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`tag-item ${selectedArticleTag === tag ? 'tag-item--active' : ''}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
