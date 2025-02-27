import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import ArticleList from '../components/ArticleList/ArticleList';
import ArticleContent from '../components/ArticleContent/ArticleContent';
import { Article } from '../components/ArticleList/ArticleItem';

// Sample data - replace with your actual data or API call
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Scaling Databases with Sharding',
    author: 'Jane Smith',
    content: `<p>Database sharding is a technique used to horizontally partition data across multiple databases to improve scalability.</p>
              <p>When your application reaches a certain scale, a single database instance might not be sufficient to handle the load. Sharding helps distribute the load across multiple database instances.</p>
              <p>Key considerations when sharding include:</p>
              <ul>
                <li>Choosing the right sharding key</li>
                <li>Handling cross-shard queries</li>
                <li>Managing data migration between shards</li>
                <li>Ensuring consistent backup and recovery processes</li>
              </ul>`
  },
  {
    id: '2',
    title: 'Microservices Architecture',
    author: 'John Doe',
    content: `<p>Microservices architecture is an approach to building applications as a collection of small, independently deployable services.</p>
              <p>Unlike monolithic architectures, microservices allow teams to develop, deploy, and scale services independently. This provides greater flexibility and resilience.</p>
              <p>Benefits include:</p>
              <ul>
                <li>Independent scaling of services</li>
                <li>Technology diversity</li>
                <li>Resilience to failure</li>
                <li>Easier continuous deployment</li>
              </ul>`
  },
  {
    id: '3',
    title: 'Load Balancing Strategies',
    author: 'Alex Chen',
    content: `<p>Load balancing is the process of distributing network traffic across multiple servers to ensure no single server bears too much load.</p>
              <p>Common load balancing algorithms include:</p>
              <ul>
                <li>Round Robin - Distributes requests sequentially across the server group</li>
                <li>Least Connections - Directs traffic to the server with the fewest active connections</li>
                <li>IP Hash - Uses the client's IP address to determine which server receives the request</li>
                <li>Weighted Round Robin - Allows some servers to handle more requests than others</li>
              </ul>`
  },
  {
    id: '4',
    title: 'Caching Strategies for Web Applications',
    author: 'Maria Garcia',
    content: `<p>Caching is a technique used to store copies of data or computed results for future requests, reducing load on servers and improving response times.</p>
              <p>Different caching levels include:</p>
              <ul>
                <li>Browser caching</li>
                <li>CDN caching</li>
                <li>Application caching</li>
                <li>Database caching</li>
              </ul>
              <p>Effective cache invalidation is crucial to ensure users receive current data while maximizing the benefits of caching.</p>`
  }
];

const HomePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  return (
    <Layout
      sidebar={
        <ArticleList
          articles={sampleArticles}
          selectedArticleId={selectedArticle?.id || null}
          onArticleSelect={handleArticleSelect}
        />
      }
      content={<ArticleContent article={selectedArticle} />}
    />
  );
};

export default HomePage;
