import React, { useState } from "react";
import { useTalksStore } from "../../stores/talksStore";
import TalkItem from "./TalkItem";
import TalkContent from "./TalkContent";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TTalk } from "../../lib/types";

export function TalkList() {
  const [selectedTalkId, setSelectedTalkId] = useState<string | null>(null);

  // Properly subscribe to the store state changes
  const isLoading = useTalksStore(state => state.isLoading);
  const errorMessage = useTalksStore(state => state.errorMessage);
  const talks = useTalksStore(state => state.getFilteredTalks());

  const handleSelectTalk = (id: string) => {
    setSelectedTalkId(id);
  };

  // Find the selected talk
  const selectedTalk = selectedTalkId
    ? talks.find(talk => talk.id === selectedTalkId)
    : null;

  return (
    <div className="talk-container">
      <div className="talk-sidebar">
        <h2 className="talk-sidebar__title">Scalability Talks</h2>

        {isLoading && <Spinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <ul className="talk-list">
          {talks.map((talk) => (
            <TalkItem
              key={talk.id}
              talk={talk}
              onSelect={() => handleSelectTalk(talk.id)}
              isSelected={selectedTalkId === talk.id}
            />
          ))}
        </ul>
      </div>

      <div className="talk-content-container">
        {selectedTalk ? (
          <TalkContent talk={selectedTalk} />
        ) : (
          <div className="talk-content-placeholder">
            <h2>Select a talk to read</h2>
            <p>Choose a talk from the sidebar to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TalkList;
