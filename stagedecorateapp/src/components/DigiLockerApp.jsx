
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_DOCUMENTS = [
  {
    id: 1,
    title: "Aadhaar Card (આધાર કાર્ડ)",
    docNumber: "XXXX-XXXX-4829",
    category: "Government ID",
    fileUrl: null,
    fileType: null,
    demo: true,
  },
  {
    id: 2,
    title: "PAN Card (પાન કાર્ડ)",
    docNumber: "ABCDE1234F",
    category: "Income Tax Dept",
    fileUrl: null,
    fileType: null,
    demo: true,
  },
];

function DigiLockerApp() {
  // PIN and vault states
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [savedPin, setSavedPin] = useState("1234");
  const [authStatus, setAuthStatus] = useState("");

  // Document states
  const [documents, setDocuments] = useState(DEFAULT_DOCUMENTS);
  const [newTitle, setNewTitle] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newCategory, setNewCategory] = useState("Personal Document");
  const [newFile, setNewFile] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Keep track of created object URLs
  const objectUrls = useRef(new Set());

  // Revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current.clear();
    };
  }, []);

  // PIN unlock
  const handlePinUnlock = (e) => {
    e.preventDefault();

    if (pinInput === savedPin) {
      setIsUnlocked(true);
      setPinInput("");
      setAuthStatus("");
    } else {
      setAuthStatus("❌ Incorrect PIN. Please try again.");
      setPinInput("");
    }
  };

  // Lock vault
  const handleLockVault = () => {
    setIsUnlocked(false);
    setPinInput("");
    setPreviewDoc(null);
    setAuthStatus("");
  };

  // Fingerprint information
  const handleFingerprintUnlock = async () => {
    if (!window.isSecureContext) {
      setAuthStatus(
        "Fingerprint authentication requires HTTPS or localhost."
      );
      return;
    }

    if (!window.PublicKeyCredential) {
      setAuthStatus(
        "This browser does not support WebAuthn biometric authentication."
      );
      return;
    }

    try {
      const available =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

      if (available) {
        setAuthStatus(
          "Your device supports biometrics, but secure fingerprint login needs a registered credential and server-side challenge verification. Please use your PIN."
        );
      } else {
        setAuthStatus(
          "No supported platform biometric authenticator was found. Please use your PIN."
        );
      }
    } catch (error) {
      console.error("Biometric check failed:", error);
      setAuthStatus(
        "Unable to check biometric support. Please use your PIN."
      );
    }
  };

  // Select file
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setNewFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setAuthStatus(
        "Only PDF, JPG, PNG and WEBP files are allowed."
      );
      e.target.value = "";
      setNewFile(null);
      return;
    }

    setAuthStatus("");
    setNewFile(file);
  };

  // Add new document
  const handleAddDocument = (e) => {
    e.preventDefault();

    if (!newTitle.trim() || !newNumber.trim()) {
      setAuthStatus("Please enter document name and document number.");
      return;
    }

    let fileUrl = null;
    let fileType = null;

    if (newFile) {
      fileUrl = URL.createObjectURL(newFile);
      fileType = newFile.type;
      objectUrls.current.add(fileUrl);
    }

    const newDoc = {
      id: Date.now(),
      title: newTitle.trim(),
      docNumber: newNumber.trim().toUpperCase(),
      category: newCategory.trim() || "Personal Document",
      fileUrl,
      fileType,
      demo: false,
    };

    setDocuments((previous) => [newDoc, ...previous]);

    setNewTitle("");
    setNewNumber("");
    setNewCategory("Personal Document");
    setNewFile(null);
    setAuthStatus("");

    const fileInput = document.getElementById("document-file");
    if (fileInput) fileInput.value = "";
  };

  // Delete document
  const handleDeleteDocument = (doc) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${doc.title}"?`
    );

    if (!confirmed) return;

    if (doc.fileUrl) {
      URL.revokeObjectURL(doc.fileUrl);
      objectUrls.current.delete(doc.fileUrl);
    }

    setDocuments((previous) =>
      previous.filter((item) => item.id !== doc.id)
    );

    if (previewDoc?.id === doc.id) {
      setPreviewDoc(null);
    }
  };

  // Change PIN
  const handleChangePin = () => {
    const newPin = window.prompt("Enter your new 4-digit PIN:");

    if (newPin === null) return;

    if (!/^\d{4}$/.test(newPin)) {
      setAuthStatus("PIN must contain exactly 4 digits.");
      return;
    }

    setSavedPin(newPin);
    setAuthStatus("PIN changed successfully.");
  };

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#020617",
      color: "#fff",
      padding: "24px 16px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    card: {
      background: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "18px",
      padding: "22px",
      boxSizing: "border-box",
    },
    input: {
      width: "100%",
      padding: "12px",
      background: "#0f172a",
      color: "#fff",
      border: "1px solid #334155",
      borderRadius: "8px",
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      padding: "11px 15px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  // Locked screen
  if (!isUnlocked) {
    return (
      <div style={styles.app}>
        <div
          style={{
            ...styles.card,
            maxWidth: "420px",
            margin: "50px auto",
            textAlign: "center",
            border: "2px solid #38bdf8",
          }}
        >
          <div style={{ fontSize: "55px" }}>🔐</div>

          <h2 style={{ color: "#38bdf8", marginBottom: "8px" }}>
            DigiLocker Secure Vault
          </h2>

          <p style={{ color: "#94a3b8", fontSize: "13px" }}>
            Enter your 4-digit PIN to unlock your vault.
          </p>

          <form onSubmit={handlePinUnlock}>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pinInput}
              onChange={(e) =>
                setPinInput(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="Enter PIN"
              autoComplete="off"
              required
              style={{
                ...styles.input,
                maxWidth: "220px",
                textAlign: "center",
                fontSize: "24px",
                letterSpacing: "8px",
                margin: "20px auto",
              }}
            />

            <button
              type="submit"
              style={{
                ...styles.button,
                width: "100%",
                background: "#38bdf8",
                color: "#020617",
              }}
            >
              🔓 Unlock with PIN
            </button>
          </form>

          <div
            style={{
              margin: "20px 0",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            OR
          </div>

          <button
            type="button"
            onClick={handleFingerprintUnlock}
            style={{
              ...styles.button,
              width: "100%",
              background: "#1e293b",
              color: "#4ade80",
              border: "1px solid #22c55e",
            }}
          >
            👆 Check Fingerprint Support
          </button>

          {authStatus && (
            <p
              role="alert"
              style={{
                marginTop: "18px",
                color: "#facc15",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {authStatus}
            </p>
          )}

          <p
            style={{
              color: "#64748b",
              fontSize: "12px",
              marginTop: "20px",
            }}
          >
            Demo PIN: 1234
          </p>
        </div>
      </div>
    );
  }

  // Unlocked dashboard
  return (
    <div style={styles.app}>
      <div style={styles.container}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            borderBottom: "1px solid #334155",
            paddingBottom: "18px",
            marginBottom: "25px",
          }}
        >
          <div>
            <h2 style={{ color: "#4ade80", margin: "0 0 7px" }}>
              🛡️ My DigiLocker Documents
            </h2>

            <span style={{ color: "#94a3b8", fontSize: "12px" }}>
              Personal Document Manager • Local Demo
            </span>
          </div>

          <button
            type="button"
            onClick={handleLockVault}
            style={{
              ...styles.button,
              background: "#ef4444",
              color: "#fff",
            }}
          >
            🔒 Lock Vault
          </button>
        </header>

        {/* Status */}
        {authStatus && (
          <div
            role="status"
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#1e293b",
              color: "#facc15",
              marginBottom: "18px",
              fontSize: "13px",
            }}
          >
            {authStatus}
            <button
              type="button"
              onClick={() => setAuthStatus("")}
              style={{
                float: "right",
                border: "none",
                background: "transparent",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Add Document Form */}
        <section
          style={{
            ...styles.card,
            marginBottom: "25px",
          }}
        >
          <h3 style={{ color: "#38bdf8", marginTop: 0 }}>
            📤 Add New Document
          </h3>

          <form
            onSubmit={handleAddDocument}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Document Name"
              required
              style={styles.input}
            />

            <input
              type="text"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="Document / ID Number"
              required
              style={styles.input}
            />

            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category"
              style={styles.input}
            />

            <input
              id="document-file"
              type="file"
              accept=".pdf,image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              style={{
                ...styles.input,
                fontSize: "12px",
              }}
            />

            {newFile && (
              <p
                style={{
                  gridColumn: "1 / -1",
                  color: "#4ade80",
                  fontSize: "12px",
                  margin: 0,
                  overflowWrap: "anywhere",
                }}
              >
                Selected: {newFile.name} (
                {(newFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}

            <button
              type="submit"
              style={{
                ...styles.button,
                background: "#22c55e",
                color: "#020617",
                gridColumn: "1 / -1",
              }}
            >
              + Add Document
            </button>
          </form>
        </section>

        {/* Document Summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ margin: 0 }}>📁 My Documents</h3>

          <span style={{ color: "#94a3b8", fontSize: "13px" }}>
            {documents.length} Documents
          </span>
        </div>

        {/* Document Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {documents.map((doc) => (
            <article
              key={doc.id}
              style={{
                ...styles.card,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    color: "#38bdf8",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {doc.category}
                </span>

                <span
                  style={{
                    color: doc.demo ? "#facc15" : "#4ade80",
                    fontSize: "10px",
                  }}
                >
                  {doc.demo ? "Demo Record" : "Locally Added"}
                </span>
              </div>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    marginBottom: "8px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {doc.title}
                </strong>

                <span
                  style={{
                    color: "#eab308",
                    fontFamily: "monospace",
                    fontSize: "13px",
                  }}
                >
                  ID: {doc.docNumber}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "auto",
                }}
              >
                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  style={{
                    ...styles.button,
                    flex: 1,
                    background: "#1e3a8a",
                    color: "#93c5fd",
                  }}
                >
                  👁️ View
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteDocument(doc)}
                  style={{
                    ...styles.button,
                    background: "#7f1d1d",
                    color: "#fecaca",
                  }}
                >
                  🗑️
                </button>
              </div>
            </article>
          ))}
        </div>

        {documents.length === 0 && (
          <div
            style={{
              ...styles.card,
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            No documents added yet.
          </div>
        )}

        {/* Document Preview */}
        {previewDoc && (
          <section
            style={{
              ...styles.card,
              marginTop: "25px",
              border: "2px solid #38bdf8",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "15px",
              }}
            >
              <h3
                style={{
                  color: "#38bdf8",
                  margin: 0,
                  overflowWrap: "anywhere",
                }}
              >
                🪪 {previewDoc.title}
              </h3>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                style={{
                  ...styles.button,
                  background: "#ef4444",
                  color: "#fff",
                }}
              >
                ✖ Close
              </button>
            </div>

            <p style={{ color: "#cbd5e1", fontSize: "13px" }}>
              Document Number:{" "}
              <strong style={{ color: "#facc15" }}>
                {previewDoc.docNumber}
              </strong>
            </p>

            {previewDoc.fileUrl &&
            previewDoc.fileType === "application/pdf" ? (
              <iframe
                title={previewDoc.title}
                src={previewDoc.fileUrl}
                style={{
                  width: "100%",
                  height: "600px",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  background: "#fff",
                }}
              />
            ) : previewDoc.fileUrl &&
              previewDoc.fileType.startsWith("image/") ? (
              <img
                src={previewDoc.fileUrl}
                alt={previewDoc.title}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "600px",
                  margin: "0 auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "35px 15px",
                  textAlign: "center",
                  background: "#020617",
                  borderRadius: "10px",
                  border: "1px dashed #475569",
                  color: "#94a3b8",
                }}
              >
                <div style={{ fontSize: "40px" }}>📄</div>
                <p>No actual file is attached to this demo record.</p>
                <p style={{ fontSize: "12px" }}>
                  Add a PDF or image file to view its contents here.
                </p>
              </div>
            )}

            {previewDoc.fileUrl && (
              <a
                href={previewDoc.fileUrl}
                download={previewDoc.title}
                style={{
                  display: "inline-block",
                  marginTop: "15px",
                  color: "#38bdf8",
                  fontSize: "13px",
                }}
              >
                ⬇ Download Document
              </a>
            )}
          </section>
        )}

        {/* Settings */}
        <section
          style={{
            ...styles.card,
            marginTop: "25px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#38bdf8" }}>
            ⚙️ Vault Settings
          </h3>

          <button
            type="button"
            onClick={handleChangePin}
            style={{
              ...styles.button,
              background: "#334155",
              color: "#fff",
            }}
          >
            🔑 Change PIN
          </button>
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "11px",
            marginTop: "30px",
          }}
        >
          DigiLocker UI Demo • Documents remain in browser memory only.
        </footer>
      </div>
    </div>
  );
}

export default DigiLockerApp;
