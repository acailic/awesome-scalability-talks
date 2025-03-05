import React, { useState, useMemo } from "react";
import { useTalksStore } from "../../stores/talksStore";
import TalkItem from "./TalkItem";
import TalkContent from "./TalkContent";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TTalk } from "../../lib/types";

export function TalkList() {
  const [selectedTalkId, setSelectedTalkId] = useState<string | null>(null);

  // Use useMemo to memoize the selectors
  const isLoading = useMemo(() => useTalksStore.getState().isLoading, []);
  const errorMessage = useMemo(() => useTalksStore.getState().errorMessage, []);
  const talks = useMemo(() => useTalksStore.getState().talks, []);

  const handleSelectTalk = (id: string) => {
    setSelectedTalkId(id);
  };

  const selectedTalk = selectedTalkId
    ? talks.find(talk => talk.id === selectedTalkId)
    : null;

  if (isLoading) return <Spinner />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="talk-container">
      <div className="talk-sidebar">
        <h2 className="talk-sidebar__title">Scalability Talks</h2>

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
