import React from 'react';
import styled from 'styled-components';
import { Article } from '../ArticleList/ArticleItem';

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleTitle = styled.h1`
  color: #222;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ArticleAuthor = styled.p`
  color: #333;
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const ArticleText = styled.div`
  line-height: 1.6;
  color: #333;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #2ecc71;
`;

interface ArticleContentProps {
  article: Article | null;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  if (!article) {
    return <EmptyState>Select an article to start reading</EmptyState>;
  }

  return (
    <ContentContainer>
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleAuthor>by {article.author}</ArticleAuthor>
      <ArticleText dangerouslySetInnerHTML={{ __html: article.content }} />
    </ContentContainer>
  );
};

export default ArticleContent;
