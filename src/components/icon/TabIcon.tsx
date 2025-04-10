import React from 'react';
import { getAssetPath } from '../../utils/paths';

interface TabIconProps {
  iconName: string;
  alt: string;
}

const TabIcon: React.FC<TabIconProps> = ({ iconName, alt }) => {
  // Import the image directly to let Vite handle the asset
  const imagePath = `/src/assets/${iconName}.png`;
  return (
    <img
      src={getAssetPath(imagePath)}
      alt={alt}
      className="tab-icon"
      style={{ height: "1.9em", marginRight: "0.5em", verticalAlign: "middle" }}
    />
  );
};

export default TabIcon;
