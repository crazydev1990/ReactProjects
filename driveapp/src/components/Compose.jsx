import React, { useEffect, useState } from "react";

function Compose({
  onClose,
  onSend,
  onSaveDraft,
  initialDraft,
  isSending,
}) {
  const [to, setTo] = useState(initialDraft?.to || "");
  const [subject, setSubject] = useState(
    initialDraft?.subject || ""
  );
  const [message, setMessage] = useState(
    initialDraft?.message || ""
  );

  useEffect(() => {
    if (initialDraft) {
      setTo(initialDraft.to || "");
      setSubject(initialDraft.subject || "");
      setMessage(initialDraft.message || "");
    }
  }, [initialDraft]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!to.trim() || !subject.trim() || !message.trim()) {
      alert("Please fill all fields.");
      return;
    }

    await onSend({ to, subject, message });
  };

  const handleDraft = () => {
    onSaveDraft({ to, subject, message });
    onClose();
  };

  return (
    <div className="compose-overlay">
      <div className="compose-window">
        <div className="compose-header">
          <h3>New Message</h3>
          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="compose-footer">
            <button
              type="submit"
              className="send-btn"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send"}
            </button>

            <button
              type="button"
              className="draft-btn"
              onClick={handleDraft}
              disabled={isSending}
            >
              Save Draft
            </button>

            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              disabled={isSending}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Compose;