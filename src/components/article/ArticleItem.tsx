import { useState } from "react";
import { TArticle } from "../../lib/types";

type ArticleItemProps = {
  article: TArticle;
  onSelect: (id: number) => void;
  isSelected?: boolean;
};

export default function ArticleItem({ article, onSelect, isSelected = false }: ArticleItemProps) {
  return (
    <li
      onClick={() => onSelect(article.id)}
      className={`article-item ${isSelected ? 'article-item--selected' : ''}`}
    >
      <h3 className="article-item__title">{article.title}</h3>

      <div className="article-item__meta">
        <span>By {article.author}</span>
        <span>{article.publishedDate}</span>
      </div>

      <div className="article-item__tags">
        {article.tags.map((tag) => (
          <span key={tag} className="article-item__tag">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}
