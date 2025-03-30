import React from 'react';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';

type ShareButtonsProps = {
  title: string;
  url: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  return (
    <div className="share-buttons">
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
