import React, { useState, useEffect, useCallback } from "react";
import "./NewsContent.scss";

const NewsContent = () => {
  const [query, setQuery] = useState("Apple");
  const [searchTerm, setSearchTerm] = useState("Apple");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const fetchArticles = useCallback((queryToFetch) => {
    setLoading(true);
    setError(null);

    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setMonth(targetDate.getMonth() - 1);

    if (targetDate.getDate() !== currentDate.getDate()) {
      targetDate.setDate(0);
    }

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const url = `/api/news?q=${encodeURIComponent(
      queryToFetch
    )}&from=${formattedDate}&sortBy=popularity`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "ok" || !data.articles) {
          setArticles([]);
          setError(data.message || "Failed to load news articles.");
        } else {
          setArticles(data.articles);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setArticles([]);
        setError("Unable to fetch news at this time.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchArticles(searchTerm);
  }, [fetchArticles, searchTerm]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchTerm(query);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(articles.length / perPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentArticles = articles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <>
      <div className="search-bar">
        <form
          role="search"
          aria-label="Search for news"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="search"
            placeholder="Search news..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
          <select onChange={handlePerPageChange} value={perPage}>
            <option value="6">6 per page</option>
            <option value="9">9 per page</option>
            <option value="12">12 per page</option>
          </select>
        </form>
      </div>

      <main>
        {loading && <div className="loading">Loading news...</div>}
        {!loading && error && <div className="error-message">{error}</div>}
        {!loading &&
          !error &&
          articles.length === 0 &&
          currentArticles.length === 0 && (
            <div className="no-news">No news articles found.</div>
          )}
        {!loading && !error && currentArticles.length > 0 && (
          <div className="cards-container">
            {currentArticles.map((article) => (
              <article className="card" key={article.url || article.title}>
                <div className="card-content">
                  <div className="card-source">
                    {article.source?.name}
                    {article.author &&
                      article.author !== article.source?.name && (
                        <span className="author">by {article.author}</span>
                      )}
                  </div>
                  <h3 className="card-title">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h3>
                  {article.description && (
                    <div className="card-description">
                      {article.description}
                    </div>
                  )}
                  {article.publishedAt && (
                    <div className="card-date">
                      Published:{" "}
                      {new Date(article.publishedAt).toLocaleDateString()}
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
              </article>
            ))}
          </div>
        )}
      </main>

      {!loading && !error && articles.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default NewsContent;
