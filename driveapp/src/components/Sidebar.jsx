import React from "react";

const folders = [
  { name: "Inbox", icon: "📥" },
  { name: "Starred", icon: "⭐" },
  { name: "Sent", icon: "📤" },
  { name: "Drafts", icon: "📝" },
  { name: "Trash", icon: "🗑️" },
];

function Sidebar({
  activeFolder,
  setActiveFolder,
  onCompose,
  inboxCount,
}) {
  return (
    <aside className="sidebar">
      <button className="compose-button" onClick={onCompose}>
        <span>✏️</span>
        Compose
      </button>

      <nav className="folder-list">
        {folders.map((folder) => (
          <button
            key={folder.name}
            className={
              activeFolder === folder.name
                ? "folder active"
                : "folder"
            }
            onClick={() => setActiveFolder(folder.name)}
          >
            <span className="folder-icon">{folder.icon}</span>
            <span>{folder.name}</span>

            {folder.name === "Inbox" && inboxCount > 0 && (
              <span className="folder-count">{inboxCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <p>Labels</p>
        <button className="label-item">
          <span>＋</span> Create new label
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;