import React from "react";

function getSender(email) {
  const from = email.from;

  if (Array.isArray(from)) {
    return from.map((item) =>
      typeof item === "string"
        ? item
        : item?.name || item?.address || ""
    ).join(", ");
  }

  if (typeof from === "object" && from !== null) {
    return from.name || from.address || "Unknown sender";
  }

  return from || email.sender || "Unknown sender";
}

function EmailList({
  emails,
  activeFolder,
  starredIds,
  onOpen,
  onStar,
  onDelete,
  onRestore,
}) {
  if (!emails.length) {
    return (
      <div className="empty-inbox">
        <div className="empty-icon">📭</div>
        <h3>{activeFolder} is empty</h3>
        <p>No emails to display.</p>
      </div>
    );
  }

  return (
    <div className="email-list">
      {emails.map((email) => {
        const isStarred = starredIds.includes(email.id);

        return (
          <div className="email-row" key={email.id}>
            <button
              className={isStarred ? "star-button starred" : "star-button"}
              title="Star"
              onClick={() => onStar(email.id)}
            >
              {isStarred ? "★" : "☆"}
            </button>

            <button
              className="email-content"
              onClick={() => onOpen(email)}
            >
              <strong className="email-sender">
                {getSender(email)}
              </strong>

              <span className="email-subject">
                {email.subject || "(No Subject)"}
              </span>

              <span className="email-preview">
                {email.preview || email.bodyExcerpt || ""}
              </span>
            </button>

            <div className="email-actions">
              {activeFolder === "Trash" ? (
                <button
                  title="Restore"
                  onClick={() => onRestore(email.id)}
                >
                  ↩
                </button>
              ) : (
                <button
                  title="Move to Trash"
                  onClick={() => onDelete(email.id)}
                >
                  🗑
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EmailList;