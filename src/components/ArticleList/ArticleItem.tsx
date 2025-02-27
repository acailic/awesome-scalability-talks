import React from 'react';
import styled from 'styled-components';

const ArticleItemContainer = styled.div<{ isSelected: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.card};
  color: ${({ isSelected, theme }) =>
    isSelected ? '#fff' : theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.primary : theme.colors.buttonHover};
    color: #fff;
  }
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
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
