import React from 'react';
import styled from 'styled-components';
import { VideoSummary } from '../types/VideoSummary';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: VideoSummary[];
  title?: string;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1200px) {
    // Your media query styles
  }
  margin: 2rem 0;
`;

const GridTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const VideoGrid: React.FC<VideoGridProps> = ({ videos, title }) => {
  return (
    <GridContainer>
      {title && <GridTitle>{title}</GridTitle>}
      <Grid>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default VideoGrid;
