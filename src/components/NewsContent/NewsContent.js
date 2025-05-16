import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../SearchBar/SearchBar";
import NewsList from "../NewsList/NewsList";
import Pagination from "../Pagination/Pagination";

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
    targetDate.setDate(currentDate.getDate() - 20);

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
      <SearchBar
        query={query}
        onQueryChange={handleInputChange}
        onSearchSubmit={handleSearchSubmit}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />

      <main>
        <NewsList articles={currentArticles} loading={loading} error={error} />
      </main>

      {!loading && !error && articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </>
  );
};

export default NewsContent;
