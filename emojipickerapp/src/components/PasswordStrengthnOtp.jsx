
import React, { useState } from "react";

// EmailJS Dashboard માંથી તમારી વિગતો નાખો
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const PasswordStrengthnOtp = () => {
  // 1. Password States
  const [password, setPassword] = useState("");
  const [strengthText, setStrengthText] = useState("Empty ⚪");
  const [strengthColor, setStrengthColor] = useState("#64748b");
  const [strengthPercent, setStrengthPercent] = useState(0);

  // 2. OTP States
  const [emailInput, setEmailInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtpInput, setUserOtpInput] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] = useState(null);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Enter your credentials to start authentication."
  );

  const [isVerified, setIsVerified] = useState(false);

  // 3. Password Strength Checker
  const handlePasswordChange = (e) => {
    const text = e.target.value;

    setPassword(text);

    if (!text) {
      setStrengthText("Empty ⚪");
      setStrengthColor("#64748b");
      setStrengthPercent(0);
      return;
    }

    let score = 0;

    if (text.length >= 8) score++;
    if (/[A-Z]/.test(text)) score++;
    if (/[a-z]/.test(text)) score++;
    if (/[0-9]/.test(text)) score++;
    if (/[^A-Za-z0-9]/.test(text)) score++;

    if (score <= 2) {
      setStrengthText("Weak 🔴");
      setStrengthColor("#ef4444");
    } else if (score <= 3) {
      setStrengthText("Medium 🟡");
      setStrengthColor("#eab308");
    } else {
      setStrengthText("Strong 🟢");
      setStrengthColor("#22c55e");
    }

    setStrengthPercent((score / 5) * 100);
  };

  // 4. Generate Secure 4-Digit OTP
  const generateOtp = () => {
    const randomArray = new Uint32Array(1);

    window.crypto.getRandomValues(randomArray);

    return String(1000 + (randomArray[0] % 9000));
  };

  // 5. Send OTP Through EmailJS
  const sendEmailOtp = async (e) => {
    e.preventDefault();

    const email = emailInput.trim();

    if (!email) return;

    // Check EmailJS configuration
    if (
      EMAILJS_SERVICE_ID === "service_yftsq2r" ||
      EMAILJS_TEMPLATE_ID === "template_wnjx6sf" ||
      EMAILJS_PUBLIC_KEY === "NgD5sH8kpaPjO7IKR"
    ) {
      setStatusMessage(
        "❌ Please configure your EmailJS Service ID, Template ID and Public Key."
      );
      return;
    }

    setLoading(true);
    setStatusMessage("Generating secure OTP...");

    // Generate OTP
    const randomOtp = generateOtp();

    // OTP expires after 5 minutes
    const expiryTime = Date.now() + 5 * 60 * 1000;

    const emailJsPayload = {
      service_id: "service_yftsq2r",
      template_id: "template_wnjx6sf",
      user_id: "NgD5sH8kpaPjO7IKR",

      template_params: {
        email: email,
        passcode: randomOtp,
        project_name: "Cloudify IT Solutions",
      },
    };

    try {
      setStatusMessage("Sending OTP to your email...");

      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailJsPayload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Email sending failed."
        );
      }

      // Store OTP only after successful API response
      setGeneratedOtp(randomOtp);
      setOtpExpiresAt(expiryTime);
      setUserOtpInput("");
      setIsVerified(false);

      setStatusMessage(
        `✅ OTP successfully sent to ${email}. Valid for 5 minutes.`
      );

    } catch (error) {
      console.error("EmailJS Error:", error);

      setGeneratedOtp("");
      setOtpExpiresAt(null);

      setStatusMessage(
        `❌ Email sending failed: ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };

  // 6. Verify OTP
  const verifyUserOtp = (e) => {
    e.preventDefault();

    if (!userOtpInput.trim()) return;

    if (!generatedOtp || !otpExpiresAt) {
      setStatusMessage("❌ Please generate a new OTP first.");
      return;
    }

    // Check OTP expiry
    if (Date.now() > otpExpiresAt) {
      setGeneratedOtp("");
      setOtpExpiresAt(null);
      setUserOtpInput("");
      setIsVerified(false);

      setStatusMessage(
        "⌛ OTP expired. Please request a new OTP."
      );

      return;
    }

    // Compare OTP as strings
    if (userOtpInput === generatedOtp) {
      setIsVerified(true);

      // Clear OTP after successful verification
      setGeneratedOtp("");
      setOtpExpiresAt(null);
      setUserOtpInput("");

      setStatusMessage(
        "🏆 Identity Verified! Authentication successful."
      );

    } else {
      setIsVerified(false);

      setStatusMessage(
        "❌ Incorrect OTP. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "440px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #38bdf8",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        boxSizing: "border-box",
        boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ color: "#38bdf8", margin: "0 0 5px 0" }}>
        Secure Gateway Console 🔒
      </h3>

      <p
        style={{
          margin: "0 0 25px 0",
          fontSize: "11px",
          color: "#64748b",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Email OTP Authentication
      </p>

      {/* Password Section */}
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <label style={styles.label}>
          CREATE PASSWORD:
        </label>

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter secret password..."
          style={styles.input}
        />

        {/* Strength Progress */}
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#020617",
            height: "7px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${strengthPercent}%`,
              backgroundColor: strengthColor,
              transition: "all 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#020617",
            padding: "8px 12px",
            borderRadius: "6px",
            border: `1px solid ${strengthColor}`,
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: strengthColor,
              fontWeight: "bold",
            }}
          >
            Strength: {strengthText}
          </span>
        </div>
      </div>

      {/* Email OTP Section */}
      <div
        style={{
          borderTop: "1px solid #1e293b",
          paddingTop: "20px",
          textAlign: "left",
        }}
      >
        <form onSubmit={sendEmailOtp}>
          <label style={styles.label}>
            ENTER EMAIL ID:
          </label>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="yourname@gmail.com"
              disabled={loading}
              required
              style={{
                ...styles.input,
                flexGrow: 1,
                minWidth: 0,
              }}
            />

            <button
              type="submit"
              disabled={loading || !emailInput.trim()}
              style={styles.sendButton}
            >
              {loading ? "Sending..." : "Send OTP 🚀"}
            </button>
          </div>
        </form>

        {/* OTP Verification Form */}
        {generatedOtp && !isVerified && (
          <form
            onSubmit={verifyUserOtp}
            style={{
              marginTop: "20px",
              backgroundColor: "#020617",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #1e293b",
            }}
          >
            <label style={styles.label}>
              ENTER 4-DIGIT EMAIL OTP:
            </label>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                pattern="[0-9]{4}"
                value={userOtpInput}
                onChange={(e) =>
                  setUserOtpInput(
                    e.target.value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                placeholder="0000"
                required
                style={{
                  ...styles.input,
                  flexGrow: 1,
                  minWidth: 0,
                  textAlign: "center",
                  letterSpacing: "4px",
                }}
              />

              <button
                type="submit"
                disabled={userOtpInput.length !== 4}
                style={styles.verifyButton}
              >
                Verify
              </button>
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "#facc15",
                marginBottom: 0,
              }}
            >
              OTP expires in 5 minutes.
            </p>
          </form>
        )}
      </div>

      {/* Status Message */}
      <p
        style={{
          margin: "20px 0 0 0",
          fontSize: "13px",
          color: isVerified ? "#22c55e" : "#94a3b8",
          fontStyle: "italic",
          minHeight: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {statusMessage}
      </p>
    </div>
  );
};

const styles = {
  label: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "bold",
    display: "block",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "11px",
    borderRadius: "6px",
    border: "1px solid #1e293b",
    backgroundColor: "#020617",
    color: "#fff",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  },

  sendButton: {
    padding: "11px 15px",
    backgroundColor: "#38bdf8",
    color: "#020617",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  verifyButton: {
    padding: "10px 15px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default PasswordStrengthnOtp;
