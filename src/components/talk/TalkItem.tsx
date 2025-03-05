import React from "react";
import { TTalk } from "../../lib/types";
import TabIcon from "../icon/TabIcon";

type TalkItemProps = {
  talk: TTalk;
  onSelect: () => void;
  isSelected: boolean;
};

export function TalkItem({ talk, onSelect, isSelected }: TalkItemProps) {
  return (
    <li
      onClick={onSelect}
      className={`talk-item ${isSelected ? 'talk-item--selected' : ''}`}
    >
      <h3 className="talk-item__title">{talk.title}</h3>
      <div className="talk-item__category">{talk.category}</div>
      <div className="talk-item__tags">
        {talk.tags.map((tag) => (
          <span key={tag} className="talk-item__tag">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}

export default TalkItem;
