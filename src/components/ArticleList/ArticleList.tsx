import React from 'react';
import styled from 'styled-components';
import ArticleItem, { Article } from './ArticleItem';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.h2`
  margin: 1rem 0;
  color: #222;
`;

interface ArticleListProps {
  articles: Article[];
  selectedArticleId: string | null;
  onArticleSelect: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  selectedArticleId,
  onArticleSelect
}) => {
  return (
    <ListContainer>
      <ListTitle>Scalability Articles</ListTitle>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          isSelected={selectedArticleId === article.id}
          onClick={() => onArticleSelect(article)}
        />
      ))}
    </ListContainer>
  );
};

export default ArticleList;
