
import React, { useState, useRef, useEffect } from "react";

function DocScanner() {
  const [imageSrc, setImageSrc] = useState(null);
  const [filterMode, setFilterMode] = useState("magic");
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(115);
  const [imageError, setImageError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const objectUrlRef = useRef(null);

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    // Revoke previous image URL
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);

    objectUrlRef.current = previewUrl;

    setImageSrc(previewUrl);
    setRotation(0);
    setBrightness(115);
    setFilterMode("magic");
    setImageError("");
  };

  // Cleanup URL
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // CSS filter
  const getFilterStyle = () => {
    if (filterMode === "magic") {
      return `brightness(${brightness}%) contrast(160%) saturate(120%)`;
    }

    if (filterMode === "bw") {
      return `grayscale(100%) brightness(${brightness}%) contrast(180%)`;
    }

    return `brightness(${brightness}%)`;
  };

  // Rotate
  const rotateDocument = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Save image with filters and rotation
  const downloadScannedDoc = async () => {
    if (!imageSrc || !imageRef.current) {
      setImageError("Please upload an image first.");
      return;
    }

    setIsSaving(true);
    setImageError("");

    try {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas is not supported.");
      }

      const isSideways = rotation === 90 || rotation === 270;

      canvas.width = isSideways ? img.naturalHeight : img.naturalWidth;
      canvas.height = isSideways ? img.naturalWidth : img.naturalHeight;

      ctx.save();

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.filter = getFilterStyle();

      ctx.drawImage(
        img,
        -img.naturalWidth / 2,
        -img.naturalHeight / 2,
        img.naturalWidth,
        img.naturalHeight
      );

      ctx.restore();

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Image export failed."));
          }
        }, "image/png");
      });

      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `Scanned_Doc_${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("Download error:", error);
      setImageError(error.message || "Unable to save image.");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset scanner
  const resetScanner = () => {
    setImageSrc(null);
    setRotation(0);
    setBrightness(115);
    setFilterMode("magic");
    setImageError("");

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>
        Smart Doc Scanner 📄
      </h2>

      <p style={styles.subtitle}>
        CamScanner Style Filter & Export Tool
      </p>

      {/* Upload */}
      <div style={styles.uploadBox}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.fileInput}
        />
      </div>

      {/* Error */}
      {imageError && (
        <div style={styles.error}>
          {imageError}
        </div>
      )}

      {/* Preview */}
      <div style={styles.previewBox}>
        {imageSrc ? (
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Scanned Document Preview"
            onLoad={() => setImageError("")}
            onError={() => setImageError("Unable to load this image.")}
            style={{
              ...styles.previewImage,
              filter: getFilterStyle(),
              transform: `rotate(${rotation}deg)`,
            }}
          />
        ) : (
          <div style={styles.emptyPreview}>
            <span style={{ fontSize: "55px" }}>📄</span>
            <p>
              Upload a photo of any bill, ID, or notes to scan.
            </p>
          </div>
        )}
      </div>

      {imageSrc && (
        <>
          {/* Filters */}
          <h4 style={styles.sectionHeading}>
            Image Filters
          </h4>

          <div style={styles.filterButtons}>
            <button
              onClick={() => setFilterMode("original")}
              style={{
                ...styles.filterButton,
                background:
                  filterMode === "original" ? "#38bdf8" : "#1e293b",
                color:
                  filterMode === "original" ? "#000" : "#fff",
              }}
            >
              🖼️ Original
            </button>

            <button
              onClick={() => setFilterMode("magic")}
              style={{
                ...styles.filterButton,
                background:
                  filterMode === "magic" ? "#10b981" : "#1e293b",
                color:
                  filterMode === "magic" ? "#000" : "#fff",
              }}
            >
              ✨ Magic Color
            </button>

            <button
              onClick={() => setFilterMode("bw")}
              style={{
                ...styles.filterButton,
                background:
                  filterMode === "bw" ? "#eab308" : "#1e293b",
                color:
                  filterMode === "bw" ? "#000" : "#fff",
              }}
            >
              ⚫⚪ B&W Doc
            </button>
          </div>

          {/* Brightness */}
          <div style={styles.sliderBox}>
            <div style={styles.sliderHeader}>
              <span>BRIGHTNESS / CLARITY</span>
              <strong>{brightness}%</strong>
            </div>

            <input
              type="range"
              min="80"
              max="160"
              value={brightness}
              onChange={(e) =>
                setBrightness(Number(e.target.value))
              }
              style={styles.slider}
            />
          </div>

          {/* Rotation */}
          <div style={styles.actionButtons}>
            <button
              onClick={rotateDocument}
              style={styles.rotateButton}
            >
              🔄 Rotate 90°
            </button>

            <button
              onClick={downloadScannedDoc}
              disabled={isSaving}
              style={styles.saveButton}
            >
              {isSaving ? "Saving..." : "💾 Save Scanned Doc"}
            </button>
          </div>

          <button
            onClick={resetScanner}
            style={styles.resetButton}
          >
            🗑️ Remove Image / Reset
          </button>
        </>
      )}

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "25px",
    backgroundColor: "#0f172a",
    borderRadius: "24px",
    border: "2px solid #10b981",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  heading: {
    color: "#10b981",
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
    padding: "14px",
    borderRadius: "12px",
    border: "1px dashed #334155",
    marginBottom: "20px",
  },

  fileInput: {
    color: "#cbd5e1",
    fontSize: "13px",
    maxWidth: "100%",
  },

  previewBox: {
    backgroundColor: "#020617",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    minHeight: "240px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: "20px",
  },

  previewImage: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "230px",
    objectFit: "contain",
    borderRadius: "4px",
    transition: "filter 0.2s ease, transform 0.2s ease",
  },

  emptyPreview: {
    color: "#64748b",
    fontSize: "13px",
  },

  error: {
    color: "#fecaca",
    background: "#7f1d1d",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
    fontSize: "13px",
  },

  sectionHeading: {
    textAlign: "left",
    color: "#10b981",
    marginBottom: "10px",
  },

  filterButtons: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
  },

  filterButton: {
    flex: 1,
    padding: "10px 6px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer",
  },

  sliderBox: {
    backgroundColor: "#020617",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    textAlign: "left",
  },

  sliderHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "bold",
  },

  slider: {
    width: "100%",
    accentColor: "#10b981",
    cursor: "pointer",
    marginTop: "10px",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
  },

  rotateButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
  },

  saveButton: {
    flex: 2,
    padding: "12px",
    backgroundColor: "#10b981",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
  },

  resetButton: {
    width: "100%",
    marginTop: "12px",
    padding: "11px",
    backgroundColor: "#7f1d1d",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default DocScanner;
