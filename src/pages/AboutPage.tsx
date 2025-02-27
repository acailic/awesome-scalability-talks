import React from 'react';
import '../styles/AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Awesome Scalability Talks</h1>
        <p>
          A curated collection of talks, articles, and resources focused on system scalability,
          distributed systems, and performance optimization.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To provide developers, architects, and technology enthusiasts with high-quality
          resources for understanding and implementing scalable systems.
        </p>
      </section>

      <section className="about-features">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Curated Content</h3>
            <p>Carefully selected talks and articles from industry experts</p>
          </div>
          <div className="feature">
            <h3>Categorized Resources</h3>
            <p>Content organized by topics for easy navigation</p>
          </div>
          <div className="feature">
            <h3>Comprehensive Documentation</h3>
            <p>Detailed guides and explanations on complex topics</p>
          </div>
          <div className="feature">
            <h3>Community Contributions</h3>
            <p>Resources suggested and vetted by the community</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>The Team</h2>
        <p>
          Our project is maintained by a group of passionate engineers dedicated to
          sharing knowledge about scalable systems architecture.
        </p>

        <div className="team-members">
          <div className="team-member">
            <h3>Lead Maintainer</h3>
            <p>Aleksandar Ilic</p>
          </div>
          <div className="team-member">
            <h3>Contributors</h3>
            <p>We welcome contributions from the community!</p>
          </div>
        </div>
      </section>

      <section className="about-contribute">
        <h2>How to Contribute</h2>
        <p>
          We welcome contributions from the community. If you know of a great resource that should be included:
        </p>
        <ol>
          <li>Submit a pull request to our GitHub repository</li>
          <li>Suggest content through our submission form</li>
          <li>Help improve our documentation</li>
        </ol>
        <a
          href="https://github.com/acailic/awesome-scalability-talks"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          Visit our GitHub Repository
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
