import { TDocumentation } from "../../lib/types";

type DocumentationItemProps = {
  doc: TDocumentation;
  onSelect: (id: string) => void;
  isSelected: boolean;
};

export default function DocumentationItem({
  doc,
  onSelect,
  isSelected
}: DocumentationItemProps) {
  return (
    <li
      onClick={() => onSelect(doc.id)}
      className={`documentation-item ${isSelected ? 'documentation-item--selected' : ''}`}
    >
      <h3 className="documentation-item__title">{doc.title}</h3>
      <div className="documentation-item__category">{doc.category}</div>
    </li>
  );
}
