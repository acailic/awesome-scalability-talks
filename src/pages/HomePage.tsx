import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import SummaryCard from '../components/SummaryCard';
import { videos } from '../data/videos';
import { Summary } from '../types';
import { fetchSummaries } from '../services/dataService';
import '../styles/HomePage.css';

const Hero = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  text-align: center;
  background-color: ${props => props.theme.colors.navBackground};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};

  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.xl};
`;

const HeroActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
`;

const PrimaryButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
    color: white;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: ${props => props.theme.colors.secondary};
  border: 2px solid ${props => props.theme.colors.secondary};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-weight: 700;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    color: white;
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.card};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  text-align: center;

  h3 {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const HomePage: React.FC = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadSummaries = async () => {
      try {
        const data = await fetchSummaries();
        setSummaries(data);
      } catch (error) {
        console.error('Failed to fetch summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSummaries();
  }, []);

  const filteredSummaries = filter
    ? summaries.filter(summary =>
        summary.title.toLowerCase().includes(filter.toLowerCase()) ||
        summary.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))
    : summaries;

  const featuredVideos = videos.filter(video => video.featured);

  return (
    <main>
      <Hero>
        <div className="container">
          <HeroTitle>
            Welcome to <span>CozyTube</span> Summaries
          </HeroTitle>
          <HeroSubtitle>
            Your cozy corner for YouTube video summaries on tech topics. Learn and discover without spending hours watching videos.
          </HeroSubtitle>
          <HeroActions>
            <PrimaryButton to="/videos">Browse Videos</PrimaryButton>
            <SecondaryButton to="/docs">React Learning</SecondaryButton>
          </HeroActions>
        </div>
      </Hero>

      <div className="container">
        <VideoGrid videos={featuredVideos} title="Featured Videos" />

        <FeaturesSection>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why CozyTube?</h2>
          <FeatureGrid>
            <FeatureCard>
              <h3>Save Time</h3>
              <p>Get the key insights from tech videos without watching the entire content.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Learn React</h3>
              <p>Use this app as a learning resource for React, TypeScript, and modern web development.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Cozy Experience</h3>
              <p>Enjoy our unique, cartoonish design that makes learning more fun and approachable.</p>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesSection>
      </div>

      <div className="home-page">
        <div className="hero">
          <h1>Cozy React Learning Hub</h1>
          <p>Discover tutorials, gain insights, and learn React in a fun, cozy way!</p>
          <div className="search">
            <input
              type="text"
              placeholder="Search summaries..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="summaries-container">
          {loading ? (
            <div className="loading">Loading summaries...</div>
          ) : filteredSummaries.length > 0 ? (
            filteredSummaries.map(summary => (
              <SummaryCard key={summary.id} summary={summary} />
            ))
          ) : (
            <div className="no-results">No summaries found matching your search.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
