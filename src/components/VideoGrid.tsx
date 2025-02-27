import React from 'react';
import styled from 'styled-components';
import { VideoSummary } from '../types/VideoSummary';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: VideoSummary[];
  title?: string;
}

const GridContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const GridTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
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
