import { useTalksStore } from "../../stores/talksStore";

export default function TalkTagList() {
  const { getTagsList, selectTag, selectedTag } = useTalksStore();
  const tags = getTagsList();

  return (
    <>
      {tags.map((tag) => (
        <li
          key={tag}
          className={`tag-list__item ${tag === selectedTag ? "tag-list__item--active" : ""}`}
          onClick={() => selectTag(tag === selectedTag ? "" : tag)}
        >
          {tag}
        </li>
      ))}
    </>
  );
}