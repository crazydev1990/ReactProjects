
import { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "crazydev1990";
const REPO_NAME = "Release";

const API_URL = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/releases`;

function DigitalLibrary() {
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    setLoading(true);
    setError("");

    try {
      let allReleases = [];
      let page = 1;

      while (true) {
        const response = await fetch(
          `${API_URL}?per_page=100&page=${page}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? "GitHub API rate limit reached. Please try again later."
              : `GitHub API Error: ${response.status}`
          );
        }

        const releases = await response.json();

        if (!Array.isArray(releases) || releases.length === 0) {
          break;
        }

        allReleases = [...allReleases, ...releases];

        if (releases.length < 100) {
          break;
        }

        page++;
      }

      const files = [];

      allReleases.forEach((release) => {
        (release.assets || []).forEach((asset) => {
          if (asset.name.toLowerCase().endsWith(".pdf")) {
            files.push({
              id: asset.id,
              name: asset.name,
              size: asset.size,
              downloadUrl: asset.browser_download_url,
              downloads: asset.download_count,
              releaseName: release.name || release.tag_name,
              releaseDate: release.published_at,
              releaseTag: release.tag_name,
            });
          }
        });
      });

      setPdfs(files);
    } catch (err) {
      console.error("PDF Fetch Error:", err);
      setError(err.message || "Unable to load PDF files.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPDFs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return pdfs;

    return pdfs.filter((pdf) =>
      `${pdf.name} ${pdf.releaseName} ${pdf.releaseTag}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [pdfs, search]);

  const formatSize = (bytes) => {
    if (!bytes) return "0 MB";

    const gb = bytes / (1024 * 1024 * 1024);

    if (gb >= 1) {
      return `${gb.toFixed(2)} GB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const openPDF = (pdf) => {
    setSelectedPdf(pdf);

    // Open the original GitHub Release asset.
    // Browser decides whether to display or download it.
    window.open(
      pdf.downloadUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="digital-library">
      <div className="library-header">
        <div>
          <span className="library-label">MY DOCUMENT COLLECTION</span>
          <h1>Digital Library</h1>
          <p>
            Browse and open PDF documents from GitHub Releases.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchPDFs}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </div>

      <div className="library-stats">
        <div className="stat-card">
          <span>Total PDF Files</span>
          <strong>{pdfs.length}</strong>
        </div>

        <div className="stat-card">
          <span>Filtered Results</span>
          <strong>{filteredPDFs.length}</strong>
        </div>

        <div className="stat-card">
          <span>Repository</span>
          <strong className="repository-name">
            {GITHUB_USER}/{REPO_NAME}
          </strong>
        </div>
      </div>

      <div className="library-toolbar">
        <input
          type="search"
          placeholder="Search PDF by name or release..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <a
          href={`https://github.com/${GITHUB_USER}/${REPO_NAME}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View GitHub Releases ↗
        </a>
      </div>

      {loading && (
        <div className="library-message">
          <div className="loader"></div>
          <p>Loading PDF documents...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-message">
          <h3>Unable to load documents</h3>
          <p>{error}</p>
          <button onClick={fetchPDFs}>Try Again</button>
        </div>
      )}

      {!loading && !error && filteredPDFs.length === 0 && (
        <div className="empty-message">
          <div className="empty-icon">📂</div>
          <h3>No PDF Files Found</h3>
          <p>
            {search
              ? "Try another search keyword."
              : "No PDF assets were found in GitHub Releases."}
          </p>
        </div>
      )}

      {!loading && !error && filteredPDFs.length > 0 && (
        <div className="pdf-grid">
          {filteredPDFs.map((pdf) => (
            <div className="pdf-card" key={pdf.id}>
              <div className="pdf-card-top">
                <div className="pdf-icon">PDF</div>
                <span className="pdf-size">
                  {formatSize(pdf.size)}
                </span>
              </div>

              <h3 title={pdf.name}>{pdf.name}</h3>

              <div className="pdf-details">
                <p>
                  <span>Release:</span>
                  {pdf.releaseName}
                </p>

                <p>
                  <span>Published:</span>
                  {formatDate(pdf.releaseDate)}
                </p>

                <p>
                  <span>Downloads:</span>
                  {pdf.downloads}
                </p>
              </div>

              <button
                className="open-pdf-button"
                onClick={() => openPDF(pdf)}
              >
                <span>↗</span> Open PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPdf && (
        <div className="selected-info">
          Last selected: <strong>{selectedPdf.name}</strong>
        </div>
      )}

      <footer className="library-footer">
        PDF documents are provided by GitHub Releases.
      </footer>
    </div>
  );
}

export default DigitalLibrary;
