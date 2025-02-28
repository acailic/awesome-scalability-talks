import React from 'react';
import { getAssetPath } from '../../utils/paths';

interface TabIconProps {
  iconName: string;
  alt: string;
}

const TabIcon: React.FC<TabIconProps> = ({ iconName, alt }) => {
  return (
    <img
      src={getAssetPath(`/src/assets/${iconName}.png`)}
      alt={alt}
      className="tab-icon"
      style={{ height: "1.9em", marginRight: "0.5em", verticalAlign: "middle" }}
    />
  );
};

export default TabIcon;
