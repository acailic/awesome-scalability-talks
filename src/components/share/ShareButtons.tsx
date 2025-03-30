import React from 'react';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';

type ShareButtonsProps = {
  title: string;
  url: string;
  summary?: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, summary }) => {
  // Use the title as a fallback for summary if not provided
  const shareDescription = summary || `Check out this talk: ${title}`;

  return (
    <div className="share-buttons">
      <LinkedinShareButton
        url={url}
        title={title}
        summary={shareDescription}
        source="Awesome Scalability Talks"
      >
        <div className="share-button-content">
          <LinkedinIcon size={32} round />
          <span className="share-text">Share on LinkedIn</span>
        </div>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
