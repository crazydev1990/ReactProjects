
import React, { useState, useRef, useEffect } from "react";

function QrScanner() {
  const [qrImage, setQrImage] = useState(null);
  const [scannedText, setScannedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [statusMessage, setStatusMessage] = useState(
    "Upload any QR Code image to scan its hidden link or text."
  );

  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);
  const imageUrlRef = useRef(null);

  // Cleanup previous image URL
  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
      }
    };
  }, []);

  // QR Image Upload and Scan
  const handleQrUploadAndScan = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Reset input so same file can be selected again
    e.target.value = "";

    // Validate image
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    // Optional file size limit: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 10 MB.");
      return;
    }

    // Revoke previous image URL
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);

    imageUrlRef.current = previewUrl;

    setQrImage(previewUrl);
    setScannedText("");
    setCopied(false);
    setErrorMessage("");
    setLoading(true);

    setStatusMessage("🔍 Scanning QR Code...");

    try {
      const formData = new FormData();

      formData.append("file", file);

      // Correct QR Server API endpoint
      const response = await fetch(
        "https://api.qrserver.com/v1/read-qr-code/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Read API response
      const decodedResult = data?.[0]?.symbol?.[0];

      if (decodedResult?.data) {
        setScannedText(decodedResult.data);
        setStatusMessage("✅ QR Code scanned successfully!");
      } else if (decodedResult?.error) {
        setStatusMessage(
          `❌ QR Scan Error: ${decodedResult.error}`
        );
      } else {
        setStatusMessage(
          "❌ No QR Code found. Try a clearer image."
        );
      }
    } catch (error) {
      console.error("QR Scan Error:", error);

      setErrorMessage(
        error.message || "Network error while scanning QR Code."
      );

      setStatusMessage(
        "❌ Unable to scan QR Code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Copy decoded text
  const copyResult = async () => {
    if (!scannedText) return;

    try {
      await navigator.clipboard.writeText(scannedText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Clipboard Error:", error);
      setErrorMessage(
        "Clipboard access failed. Please copy the text manually."
      );
    }
  };

  // Check whether decoded text is a valid HTTP/HTTPS URL
  const isValidUrl = (value) => {
    try {
      const url = new URL(value);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  // Reset scanner
  const resetScanner = () => {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }

    setQrImage(null);
    setScannedText("");
    setLoading(false);
    setCopied(false);
    setErrorMessage("");

    setStatusMessage(
      "Upload any QR Code image to scan its hidden link or text."
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>
        Smart QR Scanner 📷
      </h2>

      <p style={styles.subtitle}>
        Instant QR Code Reader • Free API
      </p>

      {/* Upload Section */}
      <div style={styles.uploadBox}>
        <label style={styles.label}>
          📤 SELECT QR CODE IMAGE:
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleQrUploadAndScan}
          style={styles.fileInput}
          disabled={loading}
        />
      </div>

      {/* Preview Section */}
      <div style={styles.previewBox}>
        {qrImage ? (
          <img
            src={qrImage}
            alt="Uploaded QR Code"
            style={styles.previewImage}
          />
        ) : (
          <div style={styles.emptyPreview}>
            <span style={{ fontSize: "55px" }}>📷</span>

            <p>
              QR Code preview will appear here
            </p>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          Scanning QR Code...
        </div>
      )}

      {/* Status */}
      <p
        style={{
          ...styles.status,
          color: loading ? "#eab308" : "#94a3b8",
        }}
      >
        {statusMessage}
      </p>

      {/* Error */}
      {errorMessage && (
        <div style={styles.error}>
          {errorMessage}
        </div>
      )}

      {/* Decoded Result */}
      {scannedText && (
        <div style={styles.resultBox}>

          <div style={styles.resultHeading}>
            🔓 DECODED DATA:
          </div>

          <div style={styles.resultText}>
            {scannedText}
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>

            <button
              onClick={copyResult}
              style={styles.copyButton}
            >
              {copied ? "✅ Copied!" : "📋 Copy Text"}
            </button>

            {isValidUrl(scannedText) && (
              <a
                href={scannedText}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.openButton}
              >
                🔗 Open Link
              </a>
            )}

          </div>
        </div>
      )}

      {/* Reset */}
      {qrImage && (
        <button
          onClick={resetScanner}
          disabled={loading}
          style={styles.resetButton}
        >
          🗑️ Clear Scanner
        </button>
      )}

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "440px",
    margin: "0 auto",
    padding: "25px",
    backgroundColor: "#0f172a",
    borderRadius: "24px",
    border: "2px solid #38bdf8",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  heading: {
    color: "#38bdf8",
    margin: "0 0 5px",
  },

  subtitle: {
    margin: "0 0 20px",
    fontSize: "11px",
    color: "#64748b",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  uploadBox: {
    backgroundColor: "#020617",
    padding: "16px",
    borderRadius: "14px",
    border: "1px dashed #334155",
    marginBottom: "20px",
  },

  label: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  fileInput: {
    color: "#cbd5e1",
    fontSize: "13px",
    maxWidth: "100%",
  },

  previewBox: {
    backgroundColor: "#020617",
    padding: "15px",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    minHeight: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    overflow: "hidden",
  },

  previewImage: {
    maxWidth: "100%",
    maxHeight: "220px",
    objectFit: "contain",
    borderRadius: "8px",
    border: "2px solid #38bdf8",
  },

  emptyPreview: {
    color: "#475569",
    fontSize: "13px",
  },

  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#eab308",
    fontSize: "13px",
    marginBottom: "12px",
  },

  spinner: {
    width: "17px",
    height: "17px",
    border: "3px solid #334155",
    borderTop: "3px solid #38bdf8",
    borderRadius: "50%",
    animation: "qrSpin 0.8s linear infinite",
  },

  status: {
    fontSize: "13px",
    fontStyle: "italic",
    marginBottom: "15px",
    lineHeight: 1.5,
  },

  error: {
    backgroundColor: "#7f1d1d",
    color: "#fecaca",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "12px",
    marginBottom: "15px",
    wordBreak: "break-word",
  },

  resultBox: {
    backgroundColor: "#020617",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #22c55e",
    textAlign: "left",
  },

  resultHeading: {
    fontSize: "11px",
    color: "#4ade80",
    fontWeight: "bold",
    marginBottom: "8px",
  },

  resultText: {
    wordBreak: "break-all",
    fontSize: "14px",
    color: "#fff",
    marginBottom: "12px",
    backgroundColor: "#0f172a",
    padding: "10px",
    borderRadius: "6px",
    lineHeight: 1.5,
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
  },

  copyButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#38bdf8",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "12px",
  },

  openButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#22c55e",
    color: "#000",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "12px",
  },

  resetButton: {
    width: "100%",
    marginTop: "15px",
    padding: "11px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

// Spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes qrSpin {
    to {
      transform: rotate(360deg);
    }
  }
`;

if (!document.getElementById("qr-scanner-styles")) {
  styleSheet.id = "qr-scanner-styles";
  document.head.appendChild(styleSheet);
}

export default QrScanner;
