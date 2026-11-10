
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Compose from "./components/Compose";
import EmailList from "./components/EmailList";
import EmailView from "./components/EmailView";

import {
  sendEmail,
  getInboxEmails,
  getSentEmails,
  getEmailDetails,
} from "./services/mailService";

const INBOX_EMAIL = import.meta.env.VITE_MAILSLURP_EMAIL;

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [inboxEmails, setInboxEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [starredIds, setStarredIds] = useState(
    () => readStorage("gmail_starred", [])
  );
  const [trashEmails, setTrashEmails] = useState(
    () => readStorage("gmail_trash", [])
  );
  const [drafts, setDrafts] = useState(
    () => readStorage("gmail_drafts", [])
  );

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const saveStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    saveStorage("gmail_starred", starredIds);
  }, [starredIds]);

  useEffect(() => {
    saveStorage("gmail_trash", trashEmails);
  }, [trashEmails]);

  useEffect(() => {
    saveStorage("gmail_drafts", drafts);
  }, [drafts]);

  const refreshEmails = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [inbox, sent] = await Promise.all([
        getInboxEmails(),
        getSentEmails(),
      ]);

      setInboxEmails(inbox);
      setSentEmails(sent);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load emails.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshEmails();
  }, [refreshEmails]);

  const handleSend = async (emailData) => {
    try {
      setSending(true);
      setError("");

      await sendEmail(emailData);

      if (selectedDraft) {
        setDrafts((previous) =>
          previous.filter((draft) => draft.id !== selectedDraft.id)
        );
      }

      setShowCompose(false);
      setSelectedDraft(null);

      alert("Email successfully sent!");

      await refreshEmails();
    } catch (err) {
      console.error("Send error:", err);
      alert("Email send failed: " + err.message);
    } finally {
      setSending(false);
    }
  };

  const saveDraft = (draftData) => {
    const draft = {
      ...draftData,
      id: selectedDraft?.id || `draft-${Date.now()}`,
      createdAt: selectedDraft?.createdAt || new Date().toISOString(),
    };

    setDrafts((previous) => {
      const exists = previous.some((item) => item.id === draft.id);

      if (exists) {
        return previous.map((item) =>
          item.id === draft.id ? draft : item
        );
      }

      return [draft, ...previous];
    });

    setSelectedDraft(null);
  };

  const toggleStar = (emailId) => {
    setStarredIds((previous) =>
      previous.includes(emailId)
        ? previous.filter((id) => id !== emailId)
        : [...previous, emailId]
    );
  };

  const moveToTrash = (emailId) => {
    const email =
      inboxEmails.find((item) => item.id === emailId) ||
      sentEmails.find((item) => item.id === emailId);

    if (!email) return;

    setTrashEmails((previous) => [
      email,
      ...previous.filter((item) => item.id !== emailId),
    ]);

    setInboxEmails((previous) =>
      previous.filter((item) => item.id !== emailId)
    );

    setSentEmails((previous) =>
      previous.filter((item) => item.id !== emailId)
    );

    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const restoreEmail = (emailId) => {
    const email = trashEmails.find((item) => item.id === emailId);

    if (!email) return;

    setTrashEmails((previous) =>
      previous.filter((item) => item.id !== emailId)
    );

    setInboxEmails((previous) => [email, ...previous]);
  };

  const openEmail = async (email) => {
    if (activeFolder === "Drafts") {
      setSelectedDraft(email);
      setShowCompose(true);
      return;
    }

    try {
      setLoading(true);
      const details = await getEmailDetails(email.id);
      setSelectedEmail(details);
    } catch (err) {
      console.error(err);
      setError("Email details could not be loaded: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentEmails = useMemo(() => {
    let list = [];

    switch (activeFolder) {
      case "Inbox":
        list = inboxEmails;
        break;
      case "Sent":
        list = sentEmails;
        break;
      case "Starred":
        list = [...inboxEmails, ...sentEmails].filter((email) =>
          starredIds.includes(email.id)
        );
        break;
      case "Drafts":
        list = drafts;
        break;
      case "Trash":
        list = trashEmails;
        break;
      default:
        list = inboxEmails;
    }

    const query = search.trim().toLowerCase();

    if (!query) return list;

    return list.filter((email) => {
      const searchable = [
        email.subject,
        email.from,
        email.to,
        email.preview,
        email.bodyExcerpt,
        email.message,
      ]
        .flat()
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [
    activeFolder,
    inboxEmails,
    sentEmails,
    starredIds,
    drafts,
    trashEmails,
    search,
  ]);

  const handleFolderChange = (folder) => {
    setActiveFolder(folder);
    setSelectedEmail(null);
    setSearch("");
  };

  return (
    <div className="app">
      <Header
        search={search}
        setSearch={setSearch}
        onRefresh={refreshEmails}
        inboxEmail={INBOX_EMAIL}
      />

      <div className="main-layout">
        <Sidebar
          activeFolder={activeFolder}
          setActiveFolder={handleFolderChange}
          onCompose={() => {
            setSelectedDraft(null);
            setShowCompose(true);
          }}
          inboxCount={inboxEmails.length}
        />

        <main className="content">
          {selectedEmail ? (
            <EmailView
              email={selectedEmail}
              onBack={() => setSelectedEmail(null)}
              onStar={toggleStar}
              isStarred={starredIds.includes(selectedEmail.id)}
            />
          ) : (
            <>
              <div className="content-toolbar">
                <h2>{activeFolder}</h2>

                <div className="toolbar-actions">
                  <span>
                    {currentEmails.length} emails
                  </span>

                  <button
                    title="Refresh"
                    onClick={refreshEmails}
                  >
                    ↻
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                  <button onClick={() => setError("")}>✕</button>
                </div>
              )}

              {loading ? (
                <div className="loading">Loading emails...</div>
              ) : (
                <EmailList
                  emails={currentEmails}
                  activeFolder={activeFolder}
                  starredIds={starredIds}
                  onOpen={openEmail}
                  onStar={toggleStar}
                  onDelete={moveToTrash}
                  onRestore={restoreEmail}
                />
              )}
            </>
          )}
        </main>
      </div>

      {showCompose && (
        <Compose
          onClose={() => {
            setShowCompose(false);
            setSelectedDraft(null);
          }}
          onSend={handleSend}
          onSaveDraft={saveDraft}
          initialDraft={selectedDraft}
          isSending={sending}
        />
      )}
    </div>
  );
}

export default App;
