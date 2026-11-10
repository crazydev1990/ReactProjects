
import React, { useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const DRIVE_SCOPE =
  "https://www.googleapis.com/auth/drive.readonly";

const DRIVE_API =
  "https://www.googleapis.com/drive/v3/files";

const GDriveApp = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [pageToken, setPageToken] = useState(null);

  // Fetch Google Drive files
  const fetchDriveItems = useCallback(
    async (token, currentPageToken = null) => {
      if (!token) {
        setError("Please connect your Google account first.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          pageSize: "100",
          orderBy: "folder,name",
          q: "trashed = false",
          fields:
            "nextPageToken,files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,iconLink)",
          supportsAllDrives: "true",
          includeItemsFromAllDrives: "true",
        });

        if (currentPageToken) {
          params.set("pageToken", currentPageToken);
        }

        const response = await fetch(
          `${DRIVE_API}?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error?.message ||
              `Google Drive API Error: ${response.status}`
          );
        }

        const formattedItems = (data.files || []).map((file) => {
          const isFolder =
            file.mimeType === "application/vnd.google-apps.folder";

          return {
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            type: isFolder ? "folder" : "file",
            size: file.size
              ? `${(
                  Number(file.size) /
                  (1024 * 1024)
                ).toFixed(2)} MB`
              : isFolder
                ? "Folder"
                : "Google File",
            date: file.modifiedTime
              ? new Date(file.modifiedTime).toLocaleDateString()
              : "--",
            url: file.webViewLink || "",
          };
        });

        setItems(formattedItems);
        setNextPageToken(data.nextPageToken || null);
        setPageToken(currentPageToken);
      } catch (err) {
        console.error("Google Drive Error:", err);
        setError(
          err.message || "Could not load Google Drive files."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Google Login
  const login = useGoogleLogin({
    scope: DRIVE_SCOPE,

    onSuccess: (tokenResponse) => {
      const token = tokenResponse.access_token;

      setUserToken(token);
      setItems([]);
      setNextPageToken(null);
      setPageToken(null);

      fetchDriveItems(token, null);
    },

    onError: (errorResponse) => {
      console.error("Google Login Failed:", errorResponse);
      setError("Google Login failed. Please try again.");
    },
  });

  // Refresh
  const handleRefresh = () => {
    if (userToken) {
      fetchDriveItems(userToken, null);
    }
  };

  // Next Page
  const handleNextPage = () => {
    if (userToken && nextPageToken) {
      fetchDriveItems(userToken, nextPageToken);
    }
  };

  // Previous Page
  const handlePreviousPage = () => {
    if (userToken) {
      fetchDriveItems(userToken, null);
    }
  };

  // Search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Open File
  const openFile = (item) => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      alert("Google Drive link is not available for this file.");
    }
  };

  return (
    <div className="drive-app">

      {/* HEADER */}
      <header className="drive-header">

        <div className="drive-brand">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
            alt="Google Drive"
          />
          <span>Drive</span>
        </div>

        <div className="drive-search">
          <span>🔍</span>

          <input
            type="search"
            placeholder="Search in Drive"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        <div className="drive-header-actions">
          {!userToken ? (
            <button
              className="connect-button"
              onClick={() => login()}
            >
              Connect Google Account
            </button>
          ) : (
            <>
              <button
                className="refresh-button"
                onClick={handleRefresh}
                disabled={loading}
              >
                ↻ Refresh
              </button>

              <span className="connected-label">
                Connected
              </span>
            </>
          )}
        </div>

      </header>

      {/* SIDEBAR + CONTENT */}
      <div className="drive-main">

        {/* LEFT SIDEBAR */}
        <aside className="drive-sidebar">

          <button className="drive-new-button">
            + New
          </button>

          <div className="drive-menu active">
            <span>💽</span>
            <span>My Drive</span>
          </div>

          <div className="drive-menu">
            <span>💻</span>
            <span>Computers</span>
          </div>

          <div className="drive-menu">
            <span>👥</span>
            <span>Shared with me</span>
          </div>

          <div className="drive-menu">
            <span>🕘</span>
            <span>Recent</span>
          </div>

          <div className="drive-menu">
            <span>⭐</span>
            <span>Starred</span>
          </div>

          <div className="drive-menu">
            <span>🗑️</span>
            <span>Trash</span>
          </div>

          <div className="drive-sidebar-divider"></div>

          <div className="drive-storage">
            <span>☁️</span>
            <span>Storage</span>
          </div>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="drive-content">

          <div className="drive-content-header">
            <h2>My Drive</h2>

            {userToken && (
              <span>{filteredItems.length} files</span>
            )}
          </div>

          {/* NOT CONNECTED */}
          {!userToken ? (

            <div className="drive-empty">
              <div className="drive-empty-icon">☁️</div>

              <h3>Connect your Google Drive</h3>

              <p>
                Login with Google to see your Drive files and folders.
              </p>

              <button
                className="connect-button"
                onClick={() => login()}
              >
                Connect Google Account
              </button>
            </div>

          ) : loading ? (

            <div className="drive-loading">
              Loading files from Google Drive...
            </div>

          ) : error ? (

            <div className="drive-error">
              <p>{error}</p>

              <button onClick={handleRefresh}>
                Try Again
              </button>
            </div>

          ) : filteredItems.length === 0 ? (

            <div className="drive-empty">
              <div className="drive-empty-icon">📂</div>

              <h3>No files found</h3>

              <p>Your search did not match any files.</p>
            </div>

          ) : (

            <>
              {/* FILES GRID */}
              <div className="drive-grid">

                {filteredItems.map((item) => (

                  <button
                    key={item.id}
                    className="drive-card"
                    onClick={() => openFile(item)}
                    title={`Open ${item.name}`}
                  >

                    <div className="drive-card-icon">
                      {item.type === "folder" ? "📁" : "📄"}
                    </div>

                    <div className="drive-card-details">

                      <div className="drive-card-name">
                        {item.name}
                      </div>

                      <div className="drive-card-info">
                        <span>{item.size}</span>
                        <span>{item.date}</span>
                      </div>

                    </div>

                  </button>

                ))}

              </div>

              {/* PAGINATION */}
              <div className="drive-pagination">

                <button
                  onClick={handlePreviousPage}
                  disabled={!pageToken || loading}
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={!nextPageToken || loading}
                >
                  Next →
                </button>

              </div>

            </>

          )}

        </main>

      </div>

    </div>
  );
};

export default GDriveApp;
