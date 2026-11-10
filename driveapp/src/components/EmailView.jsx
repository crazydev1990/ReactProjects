import React from "react";

function EmailView({ email, onBack, onStar, isStarred }) {
  if (!email) return null;

  const sender = Array.isArray(email.from)
    ? email.from.map((item) =>
        typeof item === "string"
          ? item
          : item?.name || item?.address || ""
      ).join(", ")
    : typeof email.from === "object" && email.from !== null
      ? email.from.name || email.from.address
      : email.from || "Unknown sender";

  const dateValue =
    email.createdAt || email.receivedAt || email.sentAt;

  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleString()
    : "";

  return (
    <div className="email-view">
      <div className="email-view-toolbar">
        <button onClick={onBack} title="Back">
          ← Back
        </button>

        <button
          onClick={() => onStar(email.id)}
          title="Star"
        >
          {isStarred ? "★" : "☆"}
        </button>
      </div>

      <h2 className="view-subject">
        {email.subject || "(No Subject)"}
      </h2>

      <div className="view-sender">
        <div className="sender-avatar">
          {sender?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <div>
          <strong>{sender}</strong>
          <p>{email.to?.join?.(", ") || ""}</p>
        </div>

        <span className="view-date">{formattedDate}</span>
      </div>

      <div className="view-body">
        {email.body ? (
          <div>{email.body}</div>
        ) : email.textBody ? (
          <div>{email.textBody}</div>
        ) : (
          <p>Email body is not available in this response.</p>
        )}
      </div>
    </div>
  );
}

export default EmailView;