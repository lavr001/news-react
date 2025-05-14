import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsList.scss";

const NewsList = ({ articles, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="no-news">No news articles found.</div>;
  }

  return (
    <div className="cards-container">
      {articles.map((article) => (
        <NewsCard key={article.url || article.title} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
