import { TTalk } from "../../lib/types";
import TabIcon from "../icon/TabIcon";

type TalkItemProps = {
  talk: TTalk;
  onClick: () => void;
};

export function TalkItem({ talk, onClick }: TalkItemProps) {
  return (
    <div className="item talk-item" onClick={onClick}>
      <div className="item-icon">
        {talk.icon && <TabIcon icon={talk.icon} />}
      </div>
      <div className="item-content">
        <h3 className="item-title">{talk.title}</h3>
        <p className="item-description">{talk.description}</p>
        <div className="item-tags">
          {talk.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TalkItem;