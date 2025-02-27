import React from 'react';
import styled from 'styled-components';

const ArticleItemContainer = styled.div<{ isSelected: boolean }>`
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? '#3498db' : '#ffffff'};
  color: ${({ isSelected }) =>
    isSelected ? '#fff' : '#333'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#3498db' : '#2980b9'};
    color: #fff;
  }
`;

const Title = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
`;

const Author = styled.p`
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
`;

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
}

interface ArticleItemProps {
  article: Article;
  isSelected: boolean;
  onClick: () => void;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article, isSelected, onClick }) => {
  return (
    <ArticleItemContainer isSelected={isSelected} onClick={onClick}>
      <Title>{article.title}</Title>
      <Author>by {article.author}</Author>
    </ArticleItemContainer>
  );
};

export default ArticleItem;
