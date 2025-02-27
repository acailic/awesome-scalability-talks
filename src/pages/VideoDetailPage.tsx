import React from 'react';
import { useParams } from 'react-router-dom';

const VideoDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="video-detail-container">
      <h1>Video Detail</h1>
      <p>Video ID: {id}</p>
      <div className="video-player-placeholder">
        <p>Video player will be implemented here</p>
      </div>
      <div className="video-info">
        <h2>Title will appear here</h2>
        <p>Description will appear here</p>
      </div>
    </div>
  );
};

export default VideoDetailPage;
