import React from "react";

function Header({ search, setSearch, onRefresh, inboxEmail }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="menu-icon">☰</div>

        <div className="gmail-logo">
          <span className="gmail-icon">M</span>
          <span>Gmail</span>
        </div>
      </div>

      <div className="search-box">
        <span>🔍</span>
        <input
          type="search"
          placeholder="Search mail"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      <div className="header-right">
        <button title="Refresh" onClick={onRefresh}>
          ↻
        </button>
        <div className="profile-circle" title={inboxEmail}>
          {inboxEmail?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}

export default Header;