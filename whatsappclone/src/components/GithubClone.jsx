import { useEffect, useState } from 'react'

const initialRepos = [
  {
    id: 1,
    name: 'react-dashboard',
    description: 'A modern dashboard built with React.',
    language: 'JavaScript',
    stars: 120,
    forks: 25,
    visibility: 'Public',
    updated: '2 days ago'
  },
  {
    id: 2,
    name: 'php-crud-app',
    description: 'Simple PHP CRUD application with MySQL.',
    language: 'PHP',
    stars: 85,
    forks: 12,
    visibility: 'Public',
    updated: '5 days ago'
  },
  {
    id: 3,
    name: 'portfolio-website',
    description: 'Personal portfolio website.',
    language: 'CSS',
    stars: 54,
    forks: 8,
    visibility: 'Public',
    updated: '1 week ago'
  }
]

function GitHubClone() {
  const [activePage, setActivePage] = useState('Overview')
  const [repositories, setRepositories] = useState(() => {
    const saved = localStorage.getItem('github-repositories')
    return saved ? JSON.parse(saved) : initialRepos
  })

  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [repoName, setRepoName] = useState('')
  const [repoDescription, setRepoDescription] = useState('')
  const [repoVisibility, setRepoVisibility] = useState('Public')
  const [repoLanguage, setRepoLanguage] = useState('JavaScript')
  const [starredRepos, setStarredRepos] = useState([])
  const [username, setUsername] = useState('yash-dev')

  useEffect(() => {
    localStorage.setItem(
      'github-repositories',
      JSON.stringify(repositories)
    )
  }, [repositories])

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase()) ||
    repo.description.toLowerCase().includes(search.toLowerCase())
  )

  const createRepository = (e) => {
    e.preventDefault()

    if (!repoName.trim()) {
      alert('Please enter repository name')
      return
    }

    const exists = repositories.some(
      repo => repo.name.toLowerCase() === repoName.trim().toLowerCase()
    )

    if (exists) {
      alert('Repository already exists')
      return
    }

    const newRepo = {
      id: Date.now(),
      name: repoName.trim(),
      description: repoDescription,
      language: repoLanguage,
      stars: 0,
      forks: 0,
      visibility: repoVisibility,
      updated: 'Just now'
    }

    setRepositories([newRepo, ...repositories])
    setRepoName('')
    setRepoDescription('')
    setRepoVisibility('Public')
    setRepoLanguage('JavaScript')
    setShowCreate(false)
    setActivePage('Repositories')
  }

  const toggleStar = (id) => {
    setStarredRepos(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const deleteRepository = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this repository?'
    )

    if (confirmDelete) {
      setRepositories(prev => prev.filter(repo => repo.id !== id))
      setStarredRepos(prev => prev.filter(item => item !== id))
    }
  }

  const navItems = [
    'Overview',
    'Repositories',
    'Projects',
    'Packages',
    'Stars',
    'Issues',
    'Pull Requests'
  ]

  return (
    <div className="github-app">

      {/* Header */}
      <header className="github-header">
        <div className="github-header-left">
          <button className="github-logo">●</button>
          <span className="github-brand">GitHub</span>

          <button
            className="github-menu-btn"
            onClick={() => setActivePage('Overview')}
          >
            Dashboard
          </button>
        </div>

        <div className="github-header-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setActivePage('Repositories')
            }}
          />
          <span className="search-shortcut">/</span>
        </div>

        <div className="github-header-right">
          <button onClick={() => setShowCreate(true)}>+ New</button>
          <button onClick={() => setActivePage('Issues')}>Issues</button>
          <button onClick={() => setActivePage('Pull Requests')}>Pull Requests</button>
          <div className="github-avatar">Y</div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="github-layout">

        {/* Sidebar */}
        <aside className="github-sidebar">
          <h3>Menu</h3>

          {navItems.map(item => (
            <button
              key={item}
              className={activePage === item ? 'selected' : ''}
              onClick={() => setActivePage(item)}
            >
              <span>
                {item === 'Overview' && '⌂'}
                {item === 'Repositories' && '▤'}
                {item === 'Projects' && '▦'}
                {item === 'Packages' && '□'}
                {item === 'Stars' && '☆'}
                {item === 'Issues' && '◎'}
                {item === 'Pull Requests' && '⑂'}
              </span>
              {item}
            </button>
          ))}

          <div className="sidebar-divider"></div>

          <h3>Repositories</h3>

          <button onClick={() => setShowCreate(true)}>
            + New repository
          </button>

          {repositories.slice(0, 5).map(repo => (
            <div className="sidebar-repo" key={repo.id}>
              <span className="repo-small-icon">●</span>
              {repo.name}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="github-content">

          <div className="github-page-heading">
            <div>
              <h2>
                {activePage === 'Overview'
                  ? 'Home'
                  : activePage}
              </h2>
              <p>Welcome back, {username}!</p>
            </div>

            <button
              className="github-primary-btn"
              onClick={() => setShowCreate(true)}
            >
              + New repository
            </button>
          </div>

          {/* Overview */}
          {activePage === 'Overview' && (
            <div className="github-overview">

              <div className="github-welcome-card">
                <h2>Welcome to GitHub!</h2>
                <p>
                  Build, share and collaborate on software projects.
                  Manage your repositories from one place.
                </p>
                <button onClick={() => setShowCreate(true)}>
                  Create your first repository
                </button>
              </div>

              <div className="github-stats">
                <div className="github-stat-card">
                  <h3>{repositories.length}</h3>
                  <p>Repositories</p>
                </div>

                <div className="github-stat-card">
                  <h3>{repositories.reduce((sum, repo) => sum + repo.stars, 0)}</h3>
                  <p>Total Stars</p>
                </div>

                <div className="github-stat-card">
                  <h3>{starredRepos.length}</h3>
                  <p>Starred</p>
                </div>

                <div className="github-stat-card">
                  <h3>{repositories.reduce((sum, repo) => sum + repo.forks, 0)}</h3>
                  <p>Total Forks</p>
                </div>
              </div>

              <div className="github-section-heading">
                <h3>Top Repositories</h3>
                <button onClick={() => setActivePage('Repositories')}>
                  View all
                </button>
              </div>

              <div className="github-repo-grid">
                {repositories.slice(0, 4).map(repo => (
                  <RepositoryCard
                    key={repo.id}
                    repo={repo}
                    starred={starredRepos.includes(repo.id)}
                    onStar={() => toggleStar(repo.id)}
                  />
                ))}
              </div>

              <div className="github-activity">
                <h3>Recent Activity</h3>
                <p>● Your GitHub dashboard is ready.</p>
                <p>● You have {repositories.length} repositories.</p>
                <p>● Explore your projects and repositories.</p>
              </div>
            </div>
          )}

          {/* Repositories */}
          {activePage === 'Repositories' && (
            <div>
              <div className="github-section-heading">
                <h3>Your Repositories ({filteredRepos.length})</h3>
                <button
                  className="github-primary-btn"
                  onClick={() => setShowCreate(true)}
                >
                  + New
                </button>
              </div>

              {filteredRepos.length === 0 ? (
                <div className="github-empty">
                  <h3>No repositories found</h3>
                  <p>Try another search or create a repository.</p>
                </div>
              ) : (
                filteredRepos.map(repo => (
                  <div className="github-repo-list" key={repo.id}>
                    <div>
                      <h3>{repo.name}</h3>
                      <span className="repo-visibility">
                        {repo.visibility}
                      </span>
                      <p>{repo.description || 'No description provided.'}</p>

                      <div className="repo-meta">
                        <span>● {repo.language}</span>
                        <span>☆ {repo.stars}</span>
                        <span>⑂ {repo.forks}</span>
                        <span>Updated {repo.updated}</span>
                      </div>
                    </div>

                    <div className="repo-actions">
                      <button onClick={() => toggleStar(repo.id)}>
                        {starredRepos.includes(repo.id) ? '★ Starred' : '☆ Star'}
                      </button>
                      <button
                        className="delete-repo-btn"
                        onClick={() => deleteRepository(repo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Stars */}
          {activePage === 'Stars' && (
            <div>
              <h3>Starred Repositories</h3>

              {repositories
                .filter(repo => starredRepos.includes(repo.id))
                .map(repo => (
                  <RepositoryCard
                    key={repo.id}
                    repo={repo}
                    starred={true}
                    onStar={() => toggleStar(repo.id)}
                  />
                ))}

              {starredRepos.length === 0 && (
                <div className="github-empty">
                  <h3>No starred repositories</h3>
                  <p>Star a repository to save it here.</p>
                </div>
              )}
            </div>
          )}

          {/* Projects */}
          {activePage === 'Projects' && (
            <div className="github-empty">
              <h2>Projects</h2>
              <p>Organize and track your work with projects.</p>
              <button onClick={() => alert('Project creation demo')}>
                + New Project
              </button>
            </div>
          )}

          {/* Packages */}
          {activePage === 'Packages' && (
            <div className="github-empty">
              <h2>Packages</h2>
              <p>Publish and manage your software packages.</p>
            </div>
          )}

          {/* Issues */}
          {activePage === 'Issues' && (
            <div className="github-empty">
              <h2>Issues</h2>
              <p>Track bugs, tasks and feature requests.</p>
              <button onClick={() => alert('Issue creation demo')}>
                + New Issue
              </button>
            </div>
          )}

          {/* Pull Requests */}
          {activePage === 'Pull Requests' && (
            <div className="github-empty">
              <h2>Pull Requests</h2>
              <p>Review and collaborate on code changes.</p>
              <button onClick={() => alert('Pull request creation demo')}>
                + New Pull Request
              </button>
            </div>
          )}

        </main>

        {/* Right Sidebar */}
        <aside className="github-right-sidebar">
          <div className="github-profile-card">
            <div className="github-profile-avatar">Y</div>
            <h3>{username}</h3>
            <p>Developer | React | PHP | Laravel</p>
            <button onClick={() => {
              const newName = window.prompt('Enter your username', username)
              if (newName && newName.trim()) {
                setUsername(newName.trim())
              }
            }}>
              Edit Profile
            </button>
          </div>

          <div className="github-right-card">
            <h3>Latest Changes</h3>
            <p>Welcome to your GitHub Clone.</p>
            <p>Create repositories and manage your projects.</p>
          </div>

          <div className="github-right-card">
            <h3>Useful Links</h3>
            <p>Documentation</p>
            <p>GitHub Community</p>
            <p>Developer Resources</p>
          </div>
        </aside>
      </div>

      {/* Create Repository Modal */}
      {showCreate && (
        <div className="github-modal-overlay">
          <form className="github-modal" onSubmit={createRepository}>
            <div className="github-modal-heading">
              <h2>Create a new repository</h2>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
              >
                ✕
              </button>
            </div>

            <p>
              A repository contains all of your project's files and revision history.
            </p>

            <label>Repository name *</label>
            <input
              type="text"
              placeholder="my-awesome-project"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              required
            />

            <label>Description</label>
            <textarea
              placeholder="Write a short description..."
              value={repoDescription}
              onChange={(e) => setRepoDescription(e.target.value)}
            />

            <label>Visibility</label>
            <select
              value={repoVisibility}
              onChange={(e) => setRepoVisibility(e.target.value)}
            >
              <option>Public</option>
              <option>Private</option>
            </select>

            <label>Programming Language</label>
            <select
              value={repoLanguage}
              onChange={(e) => setRepoLanguage(e.target.value)}
            >
              <option>JavaScript</option>
              <option>PHP</option>
              <option>Python</option>
              <option>Java</option>
              <option>HTML</option>
              <option>CSS</option>
              <option>TypeScript</option>
              <option>Other</option>
            </select>

            <div className="github-modal-actions">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </button>

              <button type="submit" className="github-primary-btn">
                Create repository
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}

function RepositoryCard({ repo, starred, onStar }) {
  return (
    <div className="github-repo-card">
      <h3>▤ {repo.name}</h3>
      <p>{repo.description || 'No description provided.'}</p>

      <div className="repo-meta">
        <span>● {repo.language}</span>
        <span>☆ {repo.stars}</span>
        <span>⑂ {repo.forks}</span>
      </div>

      <button onClick={onStar}>
        {starred ? '★ Starred' : '☆ Star'}
      </button>
    </div>
  )
}

export default GitHubClone
