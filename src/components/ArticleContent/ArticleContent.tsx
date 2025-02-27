import React from 'react';
import styled from 'styled-components';
import { Article } from '../ArticleList/ArticleItem';

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleTitle = styled.h1`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ArticleAuthor = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ArticleText = styled.div`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
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
