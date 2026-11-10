
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

const ICard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    empId: "",
    department: "",
    joiningDate: "",
    bloodGroup: "",
    address: "",
  });

  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cardRef = useRef(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10 digit phone number";

    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    if (!formData.empId.trim())
      newErrors.empId = "Employee ID is required";

    if (!formData.department.trim())
      newErrors.department = "Department is required";

    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining date is required";

    if (!formData.bloodGroup)
      newErrors.bloodGroup = "Select blood group";

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    if (!photo)
      newErrors.photo = "Employee photo is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowPreview(true);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      designation: "",
      empId: "",
      department: "",
      joiningDate: "",
      bloodGroup: "",
      address: "",
    });

    setPhoto("");
    setErrors({});
    setShowPreview(false);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      setDownloading(true);

      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: 1200,
      });

      const link = document.createElement("a");

      link.download =
        `${formData.fullName.replace(/\s+/g, "_")}_ID_Card.png`;

      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error(error);
      alert("Unable to download card.");
    } finally {
      setDownloading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 12px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#333",
  };

  const errorStyle = {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
  };

  const fields = [
    ["fullName", "Full Name", "text"],
    ["email", "Email Address", "email"],
    ["phone", "Phone Number", "tel"],
    ["designation", "Designation", "text"],
    ["empId", "Employee ID", "text"],
    ["department", "Department", "text"],
    ["joiningDate", "Joining Date", "date"],
  ];

  const bloodGroups = [
    "A+", "A-", "B+", "B-",
    "AB+", "AB-", "O+", "O-",
  ];

  return (
    <div className="icard-container">

      <style>{`
        .icard-container {
          max-width: 1250px;
          margin: 25px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }

        .icard-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(350px, 0.8fr);
          gap: 25px;
          align-items: start;
        }

        .icard-panel {
          background: #fff;
          padding: 22px;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.06);
          min-width: 0;
        }

        .icard-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .icard-full {
          grid-column: 1 / -1;
        }

        .icard-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .icard-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .icard-primary { background: #0d6efd; }
        .icard-danger { background: #dc3545; }
        .icard-success { background: #198754; }
        .icard-secondary { background: #495057; }

        .id-card {
          width: 350px;
          max-width: 100%;
          min-height: 560px;
          height: auto;
          margin: 0 auto;
          border: 2px solid #163b67;
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          color: #222;
          box-sizing: border-box;
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }

        .id-card-header {
          background: #163b67;
          color: white;
          text-align: center;
          padding: 22px 12px;
        }

        .id-card-body {
          padding: 20px 18px;
          text-align: center;
        }

        .id-photo {
          width: 105px;
          height: 105px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #163b67;
        }

        .id-details {
          text-align: left;
          border-top: 1px solid #ddd;
          padding-top: 13px;
          margin-top: 15px;
          font-size: 12px;
          line-height: 1.5;
        }

        .id-detail-row {
          display: grid;
          grid-template-columns: 105px minmax(0, 1fr);
          gap: 5px;
          margin-bottom: 9px;
          overflow-wrap: anywhere;
        }

        .id-card-footer {
          background: #163b67;
          color: white;
          padding: 13px;
          text-align: center;
          font-size: 12px;
        }

        @media(max-width: 850px) {
          .icard-layout {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 500px) {
          .icard-container { padding: 10px; }
          .icard-panel { padding: 14px; }
          .icard-form-grid { grid-template-columns: 1fr; }
          .icard-full { grid-column: auto; }
        }

        @media print {
          @page {
            size: auto;
            margin: 10mm;
          }

          body * {
            visibility: hidden !important;
          }

          .print-card,
          .print-card * {
            visibility: visible !important;
          }

          .print-card {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 350px !important;
            margin: 0 !important;
            box-shadow: none !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Employee ID Card Generator
      </h2>

      <div className="icard-layout">

        {/* LEFT SIDE FORM */}

        <div className="icard-panel no-print">

          <h3 style={{ marginTop: 0 }}>Employee Details</h3>

          <form onSubmit={handleSubmit}>

            <div className="icard-form-grid">

              {fields.map(([name, label, type]) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>

                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={(e) => {
                      if (name === "phone") {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                        setFormData((prev) => ({
                          ...prev,
                          phone: value,
                        }));

                        setErrors((prev) => ({
                          ...prev,
                          phone: "",
                        }));
                      } else {
                        handleChange(e);
                      }
                    }}
                    style={inputStyle}
                  />

                  {errors[name] && (
                    <div style={errorStyle}>{errors[name]}</div>
                  )}
                </div>
              ))}

              {/* BLOOD GROUP */}

              <div>
                <label style={labelStyle}>Blood Group</label>

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">Select Blood Group</option>

                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>

                {errors.bloodGroup && (
                  <div style={errorStyle}>{errors.bloodGroup}</div>
                )}
              </div>

              {/* ADDRESS */}

              <div className="icard-full">
                <label style={labelStyle}>Address</label>

                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  style={inputStyle}
                />

                {errors.address && (
                  <div style={errorStyle}>{errors.address}</div>
                )}
              </div>

              {/* PHOTO */}

              <div className="icard-full">
                <label style={labelStyle}>Employee Photo</label>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />

                {errors.photo && (
                  <div style={errorStyle}>{errors.photo}</div>
                )}

                {photo && (
                  <img
                    src={photo}
                    alt="Uploaded employee"
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: "8px",
                      objectFit: "cover",
                      marginTop: 10,
                    }}
                  />
                )}
              </div>

            </div>

            <div className="icard-actions">

              <button
                type="submit"
                className="icard-btn icard-primary"
              >
                Submit / Print Preview
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="icard-btn icard-danger"
              >
                Reset
              </button>

            </div>

          </form>
        </div>

        {/* RIGHT SIDE LIVE CARD PREVIEW */}

        <div className="icard-panel">

          <h3 className="no-print" style={{ marginTop: 0, textAlign: "center" }}>
            ID Card Preview
          </h3>

          <div className="print-card">

            <div
              className="id-card"
              ref={cardRef}
            >

              <div className="id-card-header">
                <h2 style={{ margin: 0, fontSize: 22, color:"white" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="logo" className="logo" />
                  Tesla Motors, Inc
                </h2>

                <p style={{ margin: "7px 0 0", fontSize: 11 }}>
                  EMPLOYEE IDENTITY CARD
                </p>
              </div>

              <div className="id-card-body">

                {photo ? (
                  <img
                    src={photo}
                    alt="Employee"
                    className="id-photo"
                  />
                ) : (
                  <div
                    style={{
                      width: 105,
                      height: 105,
                      borderRadius: "50%",
                      background: "#e9ecef",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      color: "#777",
                    }}
                  >
                    Photo
                  </div>
                )}

                <h2
                  style={{
                    margin: "10px 0 4px",
                    fontSize: 20,
                    overflowWrap: "anywhere",
                  }}
                >
                  {formData.fullName || "Employee Name"}
                </h2>

                <p style={{
                  color: "#163b67",
                  fontWeight: "bold",
                  margin: "0 0 12px",
                  fontSize: 13,
                }}>
                  {formData.designation || "Designation"}
                </p>

                <div className="id-details">

                  {[
                    ["Employee ID", formData.empId],
                    ["Department", formData.department],
                    ["Email", formData.email],
                    ["Phone", formData.phone],
                    ["Joining Date", formData.joiningDate],
                    ["Blood Group", formData.bloodGroup],
                    ["Address", formData.address],
                  ].map(([label, value]) => (
                    <div className="id-detail-row" key={label}>
                      <strong>{label}:</strong>
                      <span style={{ overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>
                        {value || "-"}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

              <div className="id-card-footer">
                Authorized Employee
              </div>

            </div>
          </div>

          {/* DOWNLOAD BUTTON */}

          <div className="icard-actions no-print" style={{ justifyContent: "center" }}>

            <button
              type="button"
              onClick={downloadCard}
              disabled={downloading}
              className="icard-btn icard-success"
            >
              {downloading ? "Downloading..." : "Download PNG"}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="icard-btn icard-secondary"
            >
              Print Card
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ICard;
