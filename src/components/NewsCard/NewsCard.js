import React from "react";
import "./NewsCard.scss";

const NewsCard = ({ article }) => {
  if (!article) {
    return null;
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
      key={article.url || article.title}
    >
      <div className="card-content">
        <div className="card-source">
          {article.source?.name}
          {article.author && article.author !== article.source?.name && (
            <span className="author"> by {article.author}</span>
          )}
        </div>
        <h3 className="card-title">{article.title}</h3>
        {article.description && (
          <div className="card-description">{article.description}</div>
        )}
        {article.publishedAt && (
          <div className="card-date">
            Published: {new Date(article.publishedAt).toLocaleDateString()}
          </div>
        )}
      </div>
      {article.urlToImage && (
        <div className="card-image">
          <img
            src={article.urlToImage}
            alt={article.title || "Article image"}
          />
        </div>
      )}
    </a>
  );
};

export default NewsCard;
