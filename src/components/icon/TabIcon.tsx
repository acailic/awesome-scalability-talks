import React from 'react';

interface TabIconProps {
  iconName: string;
  alt: string;
}

const TabIcon: React.FC<TabIconProps> = ({ iconName, alt }) => {
  return (
    <img
      src={`/src/assets/${iconName}.png`}
      alt={alt}
      className="tab-icon"
      style={{ height: "1.9em", marginRight: "0.5em", verticalAlign: "middle" }}
    />
  );
};

export default TabIcon;
