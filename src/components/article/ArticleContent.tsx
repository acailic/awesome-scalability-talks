import { TArticle } from "../../lib/types";

type ArticleContentProps = {
  article: TArticle;
};

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="article-content">
      <header className="article-content__header">
        <h1 className="article-content__title">{article.title}</h1>
        <div className="article-content__meta">
          <span>By {article.author}</span>
          <span>{article.publishedDate}</span>
        </div>
      </header>

      {article.imageUrl && (
        <div className="article-content__image-container">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="article-content__image"
          />
        </div>
      )}

      <div className="article-content__body">
        <p>{article.content}</p>
      </div>
    </div>
  );
}
