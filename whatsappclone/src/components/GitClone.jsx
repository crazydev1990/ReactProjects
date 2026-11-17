import { useEffect, useMemo, useState } from "react";

const API = "https://api.github.com";

function GitClone() {
  const [username, setUsername] = useState("crazydev1990");
  const [inputUsername, setInputUsername] = useState("crazydev1990");

  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const [activeTab, setActiveTab] = useState("Repositories");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("updated");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username.trim()) return;

      setLoading(true);
      setError("");
      setProfile(null);
      setRepositories([]);

      try {
        const [profileResponse, repoResponse] = await Promise.all([
          fetch(`${API}/users/${encodeURIComponent(username)}`),
          fetch(
            `${API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!profileResponse.ok) {
          if (profileResponse.status === 404) {
            throw new Error("GitHub user not found.");
          }
          if (profileResponse.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Try again later.");
          }
          throw new Error("Unable to load GitHub profile.");
        }

        if (!repoResponse.ok) {
          if (repoResponse.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Try again later.");
          }
          throw new Error("Unable to load repositories.");
        }

        const profileData = await profileResponse.json();
        const repoData = await repoResponse.json();

        setProfile(profileData);
        setRepositories(repoData);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const languages = useMemo(() => {
    const values = repositories
      .map((repo) => repo.language)
      .filter(Boolean);

    return ["All", ...new Set(values)].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    let result = [...repositories];

    if (search.trim()) {
      result = result.filter((repo) =>
        `${repo.name} ${repo.description || ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (type === "Sources") {
      result = result.filter((repo) => !repo.fork);
    } else if (type === "Forks") {
      result = result.filter((repo) => repo.fork);
    } else if (type === "Archived") {
      result = result.filter((repo) => repo.archived);
    } else if (type === "Mirrors") {
      result = result.filter((repo) => repo.mirror_url);
    }

    if (language !== "All") {
      result = result.filter((repo) => repo.language === language);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "stars") {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sort === "created") {
      result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      result.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    }

    return result;
  }, [repositories, search, type, language, sort]);

  const handleSearchUser = (e) => {
    e.preventDefault();

    const value = inputUsername.trim().replace(/^@/, "");

    if (value) {
      setUsername(value);
      setSearch("");
      setType("All");
      setLanguage("All");
      setActiveTab("Repositories");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const updated = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now - updated) / 1000);

    if (seconds < 60) return "Updated just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Updated ${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Updated ${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `Updated ${days} days ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `Updated ${months} months ago`;

    return `Updated ${Math.floor(months / 12)} years ago`;
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number || 0);
  };

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      PHP: "#4F5D95",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Java: "#b07219",
      React: "#61dafb",
      "C++": "#f34b7d",
      C: "#555555",
      Ruby: "#701516",
      Go: "#00ADD8",
      Dart: "#00B4AB",
      Vue: "#41b883",
      Shell: "#89e051",
    };

    return colors[lang] || "#8b949e";
  };

  const renderRepositoryList = () => {
    if (loading) {
      return <div className="gh-message">Loading GitHub data...</div>;
    }

    if (error) {
      return (
        <div className="gh-message gh-error">
          <h3>Unable to load GitHub data</h3>
          <p>{error}</p>
          <button onClick={() => setUsername((value) => value + " ")}>
            Try again
          </button>
        </div>
      );
    }

    if (filteredRepositories.length === 0) {
      return (
        <div className="gh-message">
          <h3>No repositories found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      );
    }

    return filteredRepositories.map((repo) => (
      <div className="gh-repo-item" key={repo.id}>
        <div className="gh-repo-main">
          <div className="gh-repo-title">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="gh-repo-name"
            >
              {repo.name}
            </a>

            <span className="gh-visibility">
              {repo.private ? "Private" : "Public"}
            </span>

            {repo.archived && (
              <span className="gh-archived">Archived</span>
            )}
          </div>

          {repo.description && (
            <p className="gh-repo-description">{repo.description}</p>
          )}

          <div className="gh-repo-meta">
            {repo.language && (
              <span className="gh-language">
                <span
                  className="gh-language-dot"
                  style={{
                    backgroundColor: getLanguageColor(repo.language),
                  }}
                />
                {repo.language}
              </span>
            )}

            {repo.stargazers_count > 0 && (
              <span className="gh-meta-item">
                <span>☆</span> {formatNumber(repo.stargazers_count)}
              </span>
            )}

            {repo.forks_count > 0 && (
              <span className="gh-meta-item">
                <span>⑂</span> {formatNumber(repo.forks_count)}
              </span>
            )}

            {repo.license?.spdx_id && (
              <span className="gh-meta-item">
                {repo.license.spdx_id}
              </span>
            )}

            <span className="gh-updated">
              {formatDate(repo.updated_at)}
            </span>
          </div>
        </div>

        <div className="gh-repo-actions">
          <a
            href={`${repo.html_url}/stargazers`}
            target="_blank"
            rel="noreferrer"
            className="gh-star-button"
          >
            ☆ <span>Star</span>
          </a>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="gh-star-dropdown"
            aria-label="Open repository"
          >
            ▾
          </a>
        </div>
      </div>
    ));
  };

  return (
    <div className="github-app">
      <header className="gh-topbar">
        <div className="gh-top-left">
          <button className="gh-menu-button">☰</button>
          <a href="https://github.com" className="gh-logo">
            <svg viewBox="0 0 16 16" width="34" height="34" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.63 5.47 7.71.4.08.55-.18.55-.4v-1.52c-2.23.49-2.7-.97-2.7-.97-.36-.94-.89-1.19-.89-1.19-.73-.51.06-.5.06-.5.8.06 1.22.84 1.22.84.71 1.24 1.87.88 2.32.67.07-.52.28-.88.51-1.08-1.78-.21-3.65-.91-3.65-4.03 0-.89.31-1.61.82-2.18-.08-.2-.36-1.03.08-2.15 0 0 .67-.22 2.2.83A7.5 7.5 0 0 1 8 3.88c.68 0 1.36.09 2 .28 1.52-1.05 2.19-.83 2.19-.83.44 1.12.16 1.95.08 2.15.51.57.82 1.29.82 2.18 0 3.13-1.87 3.82-3.66 4.02.29.26.55.75.55 1.51v2.24c0 .22.14.48.55.4A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
            </svg>
          </a>
          <strong>{username}</strong>
        </div>

        <div className="gh-top-right">
          <form className="gh-user-search" onSubmit={handleSearchUser}>
            <input
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              placeholder="Search GitHub username..."
            />
            <button type="submit">Go</button>
          </form>
          <a href="https://github.com/notifications" title="Notifications">♧</a>
          <a href="https://github.com/new" title="New repository">＋</a>
          <a href="https://github.com/issues" title="Issues">◎</a>
          <a href="https://github.com/pulls" title="Pull requests">⑂</a>
        </div>
      </header>

      <nav className="gh-tabs">
        {[
          ["Overview", "▧"],
          ["Repositories", "▣"],
          ["Projects", "▦"],
          ["Packages", "⬡"],
          ["Stars", "☆"],
        ].map(([tab, icon]) => (
          <button
            key={tab}
            className={`gh-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            <span>{icon}</span>
            {tab}
            {tab === "Repositories" && profile && (
              <span className="gh-count">{profile.public_repos}</span>
            )}
          </button>
        ))}
      </nav>

      <main className="gh-content">
        <aside className="gh-profile">
          {loading && !profile ? (
            <div className="gh-profile-loading">Loading profile...</div>
          ) : profile ? (
            <>
              <img
                src={profile.avatar_url}
                alt={`${profile.login} avatar`}
                className="gh-avatar"
              />

              <h2>{profile.name || profile.login}</h2>
              <p className="gh-login">{profile.login}</p>

              <button
                className="gh-edit-profile"
                onClick={() => window.open(profile.html_url, "_blank")}
              >
                Edit profile
              </button>

              {profile.bio && <p className="gh-bio">{profile.bio}</p>}

              <div className="gh-followers">
                <span>♙ <b>{formatNumber(profile.followers)}</b> followers</span>
                <span>·</span>
                <span><b>{formatNumber(profile.following)}</b> following</span>
              </div>

              <div className="gh-profile-details">
                {profile.company && <p>▣ {profile.company}</p>}
                {profile.location && <p>⌖ {profile.location}</p>}
                {profile.blog && (
                  <p>
                    ↗{" "}
                    <a
                      href={
                        profile.blog.startsWith("http")
                          ? profile.blog
                          : `https://${profile.blog}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.blog}
                    </a>
                  </p>
                )}
                {profile.twitter_username && (
                  <p>
                    𝕏{" "}
                    <a
                      href={`https://twitter.com/${profile.twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @{profile.twitter_username}
                    </a>
                  </p>
                )}
                <p>
                  ◷ Joined{" "}
                  {new Date(profile.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="gh-view-profile"
              >
                View on GitHub ↗
              </a>
            </>
          ) : (
            <div className="gh-profile-loading">No profile available</div>
          )}
        </aside>

        <section className="gh-main-section">
          {activeTab === "Repositories" && (
            <>
              <div className="gh-repo-toolbar">
                <input
                  className="gh-repo-search"
                  placeholder="Find a repository..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="All">Type</option>
                  <option value="Sources">Sources</option>
                  <option value="Forks">Forks</option>
                  <option value="Archived">Archived</option>
                  <option value="Mirrors">Mirrors</option>
                </select>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "Language" : item}
                    </option>
                  ))}
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="updated">Recently updated</option>
                  <option value="name">Name</option>
                  <option value="stars">Most stars</option>
                  <option value="created">Recently created</option>
                </select>

                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="gh-new-button"
                >
                  ▣ New
                </a>
              </div>

              <div className="gh-results-count">
                {loading
                  ? "Loading repositories..."
                  : `${filteredRepositories.length} repositories`}
              </div>

              <div className="gh-repository-list">
                {renderRepositoryList()}
              </div>
            </>
          )}

          {activeTab === "Overview" && (
            <div className="gh-tab-content">
              <h2>Overview</h2>
              {profile && (
                <>
                  <h3>{profile.name || profile.login}</h3>
                  <p>{profile.bio || "No bio available."}</p>
                  <p>
                    {formatNumber(profile.public_repos)} public repositories
                  </p>
                  <a href={profile.html_url} target="_blank" rel="noreferrer">
                    View GitHub profile ↗
                  </a>
                </>
              )}
            </div>
          )}

          {activeTab === "Projects" && (
            <div className="gh-tab-content">
              <h2>Projects</h2>
              <p>Public profile project boards are not available through this basic profile API.</p>
              <a href={`https://github.com/${username}/projects`} target="_blank" rel="noreferrer">
                Open GitHub Projects ↗
              </a>
            </div>
          )}

          {activeTab === "Packages" && (
            <div className="gh-tab-content">
              <h2>Packages</h2>
              <p>Open this user's GitHub Packages page to see available packages.</p>
              <a href={`https://github.com/${username}?tab=packages`} target="_blank" rel="noreferrer">
                View Packages ↗
              </a>
            </div>
          )}

          {activeTab === "Stars" && (
            <div className="gh-tab-content">
              <h2>Stars</h2>
              <p>Repositories starred by this user.</p>
              <a href={`https://github.com/${username}?tab=stars`} target="_blank" rel="noreferrer">
                View Starred Repositories ↗
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default GitClone;
