import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

export const BookmarkIcon: React.FC<IconProps> = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.5 0.5" />
  </svg>
);

export const LeafIcon: React.FC<IconProps> = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 21C7.78869 21 9.55738 20.8543 11 20.1716C15 18.1716 16 12.1716 20 10.1716C18.5 13.1716 18.5 17.1716 15 19.1716C13.5 20.1716 11 21 11 21"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 20C8 18 5 16 4 12C3 8 3 3 3 3C3 3 8 4 12 5C16 6 18 9 20 12C18 15 16 18 12 20Z"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FlowerIcon: React.FC<IconProps> = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <path d="M12 9C12 7 13 5 15 3C17 5 18 7 18 9C18 11 16 12 15 12"
          stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 15C12 17 13 19 15 21C17 19 18 17 18 15C18 13 16 12 15 12"
          stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 9C12 7 11 5 9 3C7 5 6 7 6 9C6 11 8 12 9 12"
          stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 15C12 17 11 19 9 21C7 19 6 17 6 15C6 13 8 12 9 12"
          stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
