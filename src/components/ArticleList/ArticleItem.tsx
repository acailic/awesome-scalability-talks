import React from 'react';
import styled from 'styled-components';
import Icons from '../../assets/icons';

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
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: ${({ isSelected }) =>
    isSelected ? '2px solid #2980b9' : '2px solid transparent'};

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#3498db' : '#f8f8f8'};
    border: 2px solid #2980b9;
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-family: 'Mochiy Pop One', sans-serif;
`;

const Author = styled.p`
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
  font-family: 'Varela Round', sans-serif;
`;

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  category?: string;
}

interface ArticleItemProps {
  article: Article;
  isSelected: boolean;
  onClick: () => void;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article, isSelected, onClick }) => {
  // Select icon based on article category or default to bookmark
  const getIconForArticle = (article: Article) => {
    const iconColor = isSelected ? '#fff' : '#3498db';

    switch(article.category?.toLowerCase()) {
      case 'nature':
        return <Icons.leaf color={iconColor} size={28} />;
      case 'gardening':
        return <Icons.flower color={iconColor} size={28} />;
      case 'featured':
        return <Icons.star color={iconColor} size={28} />;
      case 'reading':
        return <Icons.book color={iconColor} size={28} />;
      default:
        return <Icons.bookmark color={iconColor} size={28} />;
    }
  };

  return (
    <ArticleItemContainer isSelected={isSelected} onClick={onClick}>
      <IconWrapper>
        {getIconForArticle(article)}
      </IconWrapper>
      <ContentWrapper>
        <Title>{article.title}</Title>
        <Author>by {article.author}</Author>
      </ContentWrapper>
    </ArticleItemContainer>
  );
};

export default ArticleItem;
