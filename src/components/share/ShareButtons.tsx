import React from 'react';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

type ShareButtonsProps = {
  title: string;
  url: string;
  summary?: string;
  source?: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, summary, source = "Awesome Scalability Talks" }) => {
  // Create a more descriptive share message
  const shareDescription = summary
    ? `${summary} | From the Awesome Scalability Talks collection`
    : `Check out this talk: "${title}" | From the Awesome Scalability Talks collection`;

  return (
    <div className="share-buttons">
      <LinkedinShareButton
        url={url}
        title={title}
        summary={shareDescription}
        source={source}
      >
        <div className="share-button-content">
          <FontAwesomeIcon icon={faShareAlt} style={{ marginRight: '5px', fontSize: '16px' }} />
          <LinkedinIcon size={32} round />
        </div>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
