import { useState, useEffect } from "react";
import { useTalksStore } from "../../stores/talksStore";
import TalkItem from "./TalkItem";
import TalkContent from "./TalkContent";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import TagList from "../tag/TagList";
import { TTalk } from "../../lib/types";

export function TalkList() {
  const { 
    talks, 
    isLoading, 
    errorMessage, 
    fetchTalks, 
    getTagsList,
    getFilteredTalks,
    selectTag,
    selectedTag 
  } = useTalksStore();
  const [selectedTalk, setSelectedTalk] = useState<TTalk | null>(null);

  useEffect(() => {
    fetchTalks();
  }, [fetchTalks]);

  const handleTalkClick = (talk: TTalk) => {
    setSelectedTalk(talk);
  };

  const handleBackClick = () => {
    setSelectedTalk(null);
  };

  const handleTagClick = (tag: string) => {
    selectTag(tag === selectedTag ? "" : tag);
  };

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  if (selectedTalk) {
    return (
      <div className="content-container">
        <button className="back-button" onClick={handleBackClick}>
          &larr; Back to Talks
        </button>
        <TalkContent talk={selectedTalk} />
      </div>
    );
  }

  const filteredTalks = getFilteredTalks();
  const allTags = getTagsList();

  return (
    <div className="list-container">
      <div className="tag-filter">
        <h3>Filter by Tag</h3>
        <TagList 
          tags={allTags} 
          selectedTag={selectedTag} 
          onTagClick={handleTagClick} 
        />
      </div>
      <div className="items-list">
        {filteredTalks.length === 0 ? (
          <p>No talks found.</p>
        ) : (
          filteredTalks.map((talk) => (
            <TalkItem 
              key={talk.id} 
              talk={talk} 
              onClick={() => handleTalkClick(talk)} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TalkList;