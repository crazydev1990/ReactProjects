
import React, { useEffect, useRef, useState } from "react";

const GoogleSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Input element reference
  const searchRef = useRef(null);

  // Entire search box + dropdown reference
  const searchBoxRef = useRef(null);

  // --------------------------------------------------
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // --------------------------------------------------

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  // --------------------------------------------------
  // DYNAMIC DUCKDUCKGO AUTOCOMPLETE
  // --------------------------------------------------

  useEffect(() => {
    const searchText = query.trim();

    if (!searchText) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionLoading(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setSuggestionLoading(true);

        const response = await fetch(
          `/ddg-autocomplete/?q=${encodeURIComponent(searchText)}&type=list`
        );

        if (!response.ok) {
          throw new Error("Suggestion request failed");
        }

        const data = await response.json();

        if (cancelled) return;

        const suggestionList = Array.isArray(data?.[1])
          ? data[1]
              .map((item) => item.phrase)
              .filter(Boolean)
          : [];

        setSuggestions(suggestionList);
        setShowSuggestions(suggestionList.length > 0);
        setActiveIndex(-1);
      } catch (err) {
        if (!cancelled) {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } finally {
        if (!cancelled) {
          setSuggestionLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // --------------------------------------------------
  // INPUT CHANGE
  // --------------------------------------------------

  const handleInputChange = (event) => {
    const value = event.target.value;

    setQuery(value);
    setError("");
    setActiveIndex(-1);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setResults([]);
      setSearched(false);
    }
  };

  // --------------------------------------------------
  // SEARCH DUCKDUCKGO HTML RESULTS
  // --------------------------------------------------

  const handleSearch = async (searchText = query) => {
    const searchQuery = searchText.trim();

    if (!searchQuery) {
      setError("Please enter something to search.");
      setShowSuggestions(false);
      return;
    }

    setQuery(searchQuery);
    setShowSuggestions(false);
    setActiveIndex(-1);

    setLoading(true);
    setError("");
    setResults([]);
    setSearched(true);

    try {
      const response = await fetch(
        `/ddg-search/?q=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const html = await response.text();

      const parser = new DOMParser();
      const documentData = parser.parseFromString(html, "text/html");

      const resultElements = documentData.querySelectorAll(".result");

      const searchResults = Array.from(resultElements)
        .map((element) => {
          const titleElement = element.querySelector(".result__a");
          const snippetElement = element.querySelector(".result__snippet");
          const urlElement = element.querySelector(".result__url");

          if (!titleElement) return null;

          let link = titleElement.getAttribute("href") || "";

          // Extract actual URL from DuckDuckGo redirect
          try {
            const parsedUrl = new URL(link, "https://duckduckgo.com");

            const redirectedUrl = parsedUrl.searchParams.get("uddg");

            if (redirectedUrl) {
              link = decodeURIComponent(redirectedUrl);
            } else {
              link = parsedUrl.href;
            }
          } catch {
            // Keep original link if URL parsing fails
          }

          if (!link.startsWith("http://") && !link.startsWith("https://")) {
            return null;
          }

          return {
            title: titleElement.textContent.trim(),
            link,
            snippet: snippetElement?.textContent.trim() || "",
            displayUrl: urlElement?.textContent.trim() || link,
          };
        })
        .filter(Boolean);

      // Remove duplicate URLs
      const uniqueResults = searchResults.filter(
        (item, index, array) =>
          array.findIndex((result) => result.link === item.link) === index
      );

      setResults(uniqueResults);

      if (uniqueResults.length === 0) {
        setError("No Search Result Found! Try Again..!");
      }
    } catch (err) {
      console.error("Search Error:", err);
      setError("Network Issue while searching....");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // FORM SUBMIT
  // --------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  // --------------------------------------------------
  // SUGGESTION CLICK
  // --------------------------------------------------

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setActiveIndex(-1);
    handleSearch(suggestion);
  };

  // --------------------------------------------------
  // KEYBOARD NAVIGATION
  // --------------------------------------------------

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      if (suggestions.length > 0) {
        event.preventDefault();
        setShowSuggestions(true);

        setActiveIndex((previous) =>
          previous < suggestions.length - 1 ? previous + 1 : 0
        );
      }
    }

    if (event.key === "ArrowUp") {
      if (suggestions.length > 0) {
        event.preventDefault();

        setActiveIndex((previous) =>
          previous > 0 ? previous - 1 : suggestions.length - 1
        );
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (
        showSuggestions &&
        activeIndex >= 0 &&
        suggestions[activeIndex]
      ) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        handleSearch();
      }
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  // --------------------------------------------------
  // CLEAR SEARCH
  // --------------------------------------------------

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setResults([]);
    setError("");
    setShowSuggestions(false);
    setSearched(false);
    setActiveIndex(-1);

    searchRef.current?.focus();
  };

  // --------------------------------------------------
  // JSX
  // --------------------------------------------------

  return (
    <div className="google-search-page">

      {/* LOGO */}
      <div className="google-logo">
        <span className="logo-blue">M</span>
        <span className="logo-red">y</span>
        <span className="logo-yellow">G</span>
        <span className="logo-blue">o</span>
        <span className="logo-green">o</span>
        <span className="logo-red">g</span>
        <span className="logo-blue">l</span>
        <span className="logo-green">e</span>
      </div>

      {/* SEARCH FORM */}
      <form className="google-search-form" onSubmit={handleSubmit}>

        {/* IMPORTANT: Wrapper contains BOTH input and dropdown */}
        <div className="search-box-wrapper" ref={searchBoxRef}>

          <div className="search-input-box">

            <span className="search-icon">⌕</span>

            <input
              ref={searchRef}
              type="text"
              value={query}
              placeholder="Search anything..."
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              autoComplete="off"
            />

            {query && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

            {suggestionLoading && (
              <span className="suggestion-loader"></span>
            )}

          </div>

          {/* SUGGESTIONS DROPDOWN */}
         {showSuggestions &&
  suggestions.length > 0 &&
  results.length === 0 &&
  !searched && (
    <div className="suggestions-dropdown">

              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion}-${index}`}
                  className={`suggestion-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-search-icon">⌕</span>

                  <span>{suggestion}</span>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* BUTTONS */}
        <div className="google-search-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Google Search"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (query.trim()) {
                window.open(
                  `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
          >
            I'm Feeling Lucky
          </button>
        </div>

      </form>

      {/* LOADING */}
      {loading && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching results...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="search-error">
          {error}
        </div>
      )}

      {/* SEARCH RESULTS */}
      {!loading && searched && results.length > 0 && (
        <div className="search-results">

          <p className="result-count">
            Search results for: <strong>{query}</strong>
          </p>

          {results.map((result, index) => (
            <div className="search-result-item" key={`${result.link}-${index}`}>

              <div className="result-url">
                {result.displayUrl}
              </div>

              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="result-title"
              >
                {result.title}
              </a>

              {result.snippet && (
                <p className="result-snippet">
                  {result.snippet}
                </p>
              )}

            </div>
          ))}

        </div>
      )}

      {/* FOOTER */}
      <div className="google-search-footer">
        Search powered by DuckDuckGo
      </div>

    </div>
  );
};

export default GoogleSearch;
