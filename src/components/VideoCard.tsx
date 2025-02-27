import React, { useState } from 'react';
import styled from 'styled-components';
import { VideoSummary } from '../types/VideoSummary';

interface VideoCardProps {
  video: VideoSummary;
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const CardImage = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 1;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.85rem;
  color: ${({ theme }) => `rgba(${theme.colors.text}, 0.7)`};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.pill};
    font-size: 0.75rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
`;

const SummaryToggle = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExpandableSummary = styled.div<{ expanded: boolean }>`
  height: ${props => props.expanded ? 'auto' : '0'};
  overflow: hidden;
  transition: height 0.3s ease;
  margin-top: ${props => props.expanded ? props.theme.spacing.md : '0'};
  padding: ${props => props.expanded ? props.theme.spacing.md : '0'};
  background-color: ${({ theme }) => `rgba(${theme.colors.background}, 0.5)`};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  p {
    margin: 0;
    font-size: 0.95rem;
    white-space: pre-line;
  }
`;

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSummary = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardImage>
        <img src={video.thumbnailUrl} alt={video.title} />
        <CategoryBadge>{video.category}</CategoryBadge>
      </CardImage>
      <CardContent>
        <CardTitle>{video.title}</CardTitle>
        <CardMeta>
          <span>{video.duration}</span>
        </CardMeta>
        <TagsContainer>
          {video.tags.slice(0, 3).map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </TagsContainer>
        <CardActions>
          <Button as="a" href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank">
            Watch Video
          </Button>
          <SummaryToggle onClick={toggleSummary}>
            {expanded ? 'Hide Summary' : 'Show Summary'}
          </SummaryToggle>
        </CardActions>
        <ExpandableSummary expanded={expanded}>
          <p>{video.summary}</p>
        </ExpandableSummary>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
