
import React, { useState } from "react";

const initialFormData = {
  fullName: "",
  email: "",
  contact: "",
  dob: "",
  degreeName: "",
  passingYear: "",
  address: "",
  aboutMe: "",

  totalExperience: "",
  lastCtc: "",
  expectedCtc: "",
  noticePeriod: "",
  lastCompany: "",
  lastDesignation: "",
  leaveReason: "",

  pastCompaniesList: "",
  schoolCollegeDetails: "",
  projectsList: "",
  techStackFactors: "",
};

const stepFields = [
  {
    title: "Personal Details",
    description: "Enter your personal and educational information.",
    fields: [
      { name: "fullName", label: "Full Name", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "contact", label: "Contact Number", type: "tel", required: true },
      { name: "dob", label: "Date of Birth", type: "date" },
      { name: "degreeName", label: "Highest Degree / Qualification", required: true },
      { name: "passingYear", label: "Passing Year", type: "number", required: true },
      { name: "address", label: "Address / City", required: true },
      {
        name: "aboutMe",
        label: "Professional Summary / About Me",
        textarea: true,
        required: true,
        placeholder: "Write 3-5 lines about your experience, strengths and career goals.",
      },
    ],
  },
  {
    title: "Professional Details",
    description: "Add your current or most recent employment details.",
    fields: [
      { name: "totalExperience", label: "Total Experience (Years)", type: "number", required: true },
      { name: "lastCompany", label: "Last / Current Company", required: true },
      { name: "lastDesignation", label: "Last / Current Designation", required: true },
      { name: "lastCtc", label: "Last CTC" },
      { name: "expectedCtc", label: "Expected CTC" },
      { name: "noticePeriod", label: "Notice Period" },
      { name: "leaveReason", label: "Reason for Leaving", textarea: true },
    ],
  },
  {
    title: "Work Experience",
    description: "Add your previous companies and employment history.",
    fields: [
      {
        name: "pastCompaniesList",
        label: "Previous Companies",
        textarea: true,
        placeholder:
          "Enter one company per line.\n\nExample:\nABC Technologies - PHP Developer - 2020 to 2022\nXYZ Solutions - Sr. PHP Developer - 2022 to Present",
      },
    ],
  },
  {
    title: "Education Details",
    description: "Add your academic history.",
    fields: [
      {
        name: "schoolCollegeDetails",
        label: "School / College Details",
        textarea: true,
        placeholder:
          "Enter one qualification per line.\n\nExample:\nBCA - Gujarat University - 2018\nHSC - Gujarat Board - 2015\nSSC - Gujarat Board - 2013",
      },
    ],
  },
  {
    title: "Projects & Technical Skills",
    description: "Add projects and technologies you have worked with.",
    fields: [
      {
        name: "projectsList",
        label: "Projects",
        textarea: true,
        placeholder:
          "Enter one project per line.\n\nExample:\nE-commerce Website - Developed product, cart and checkout modules.\nAdmin Dashboard - Created role-based management system.",
      },
      {
        name: "techStackFactors",
        label: "Technical Skills",
        textarea: true,
        placeholder:
          "PHP, Laravel, Yii, WordPress, JavaScript, React, MySQL, HTML, CSS, Git...",
      },
    ],
  },
];

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [statusMessage, setStatusMessage] = useState("");
  const [showCv, setShowCv] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateCurrentStep = () => {
    const currentFields = stepFields[currentStep].fields;

    for (const field of currentFields) {
      const value = formData[field.name]?.trim() || "";

      if (field.required && !value) {
        setStatusMessage(`${field.label} is required.`);
        return false;
      }

      if (field.name === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          setStatusMessage("Please enter a valid email address.");
          return false;
        }
      }

      if (field.name === "contact" && value) {
        const digits = value.replace(/\D/g, "");

        if (digits.length < 10 || digits.length > 15) {
          setStatusMessage("Contact number must contain 10 to 15 digits.");
          return false;
        }
      }

      if (field.name === "passingYear" && value) {
        if (!/^\d{4}$/.test(value)) {
          setStatusMessage("Please enter a valid 4-digit passing year.");
          return false;
        }
      }

      if (field.name === "totalExperience" && value) {
        const experience = Number(value);

        if (!Number.isFinite(experience) || experience < 0 || experience > 60) {
          setStatusMessage("Please enter valid total experience.");
          return false;
        }
      }
    }

    setStatusMessage("");
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    setCurrentStep((previous) => Math.min(previous + 1, 5));
    setStatusMessage("");
  };

  const handlePrevious = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
    setStatusMessage("");
  };

  const validateAllSteps = () => {
    for (const step of stepFields) {
      for (const field of step.fields) {
        const value = formData[field.name]?.trim() || "";

        if (field.required && !value) {
          setStatusMessage(`Please complete ${field.label}.`);
          return false;
        }

        if (field.name === "email" && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            setStatusMessage("Please enter a valid email address.");
            return false;
          }
        }

        if (field.name === "contact" && value) {
          const digits = value.replace(/\D/g, "");
          if (digits.length < 10 || digits.length > 15) {
            setStatusMessage("Please enter a valid contact number.");
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleGenerateCv = () => {
    if (!validateAllSteps()) {
      setShowCv(false);
      return;
    }

    setShowCv(true);
    setStatusMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const formatLines = (value) => {
    return (value || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^[-•*]\s*/, ""));
  };

  const skills = formatLines(
    formData.techStackFactors.replace(/,/g, "\n")
  );

  const renderField = (field) => (
    <div className="form-field" key={field.name}>
      <label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="required-star"> *</span>}
      </label>

      {field.textarea ? (
        <textarea
          id={field.name}
          name={field.name}
          value={formData[field.name]}
          onChange={updateField}
          placeholder={field.placeholder || ""}
          rows={5}
        />
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type || "text"}
          value={formData[field.name]}
          onChange={updateField}
          placeholder={field.placeholder || ""}
          min={field.type === "number" ? 0 : undefined}
        />
      )}
    </div>
  );

  const renderCvList = (value) => {
    const lines = formatLines(value);

    if (!lines.length) {
      return <p className="cv-empty">Not provided</p>;
    }

    return (
      <ul className="cv-list">
        {lines.map((line, index) => (
          <li key={`${line}-${index}`}>{line}</li>
        ))}
      </ul>
    );
  };

  const renderCvSection = (title, children) => (
    <section className="cv-section">
      <h2>{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="multi-step-wrapper">
      {!showCv ? (
        <div className="application-container">
          <div className="application-header">
            <span className="application-label">CAREER APPLICATION</span>
            <h1>Candidate Information Form</h1>
            <p>Complete your details to generate your professional resume.</p>
          </div>

          <div className="step-progress">
            {stepFields.map((step, index) => (
              <div
                className={`progress-item ${
                  index === currentStep ? "active" : ""
                } ${index < currentStep ? "completed" : ""}`}
                key={step.title}
              >
                <div className="progress-circle">
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span>{step.title}</span>
              </div>
            ))}
          </div>

          <div className="form-card">
            <div className="form-card-heading">
              <div>
                <span className="step-count">
                  STEP {currentStep + 1} OF {stepFields.length}
                </span>
                <h2>{stepFields[currentStep].title}</h2>
                <p>{stepFields[currentStep].description}</p>
              </div>
            </div>

            <div className="form-grid">
              {stepFields[currentStep].fields.map(renderField)}
            </div>

            {statusMessage && (
              <div className="form-message error-message">
                {statusMessage}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </button>

              {currentStep < stepFields.length - 1 ? (
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleNext}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleGenerateCv}
                >
                  Generate Professional CV
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="cv-preview-container">
          <div className="cv-toolbar no-print">
            <div>
              <span className="application-label">RESUME PREVIEW</span>
              <h2>Your Professional CV</h2>
              <p>Review your resume before printing or saving it.</p>
            </div>

            <div className="cv-toolbar-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowCv(false)}
              >
                ← Edit Details
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={handlePrint}
              >
                Print / Save PDF
              </button>
            </div>
          </div>

          <div className="cv-print-area">
            {/* PAGE 1 */}
            <article className="cv-page">
              <header className="cv-header">
                <h1>{formData.fullName}</h1>

                <p className="cv-designation">
                  {formData.lastDesignation || formData.degreeName}
                </p>

                <div className="cv-contact-line">
                  {formData.email && <span>{formData.email}</span>}
                  {formData.contact && <span>{formData.contact}</span>}
                  {formData.address && <span>{formData.address}</span>}
                </div>
              </header>

              {renderCvSection(
                "PROFESSIONAL SUMMARY",
                <p className="cv-paragraph">
                  {formData.aboutMe || "Professional summary not provided."}
                </p>
              )}

              {renderCvSection(
                "TECHNICAL SKILLS",
                skills.length ? (
                  <div className="cv-skills">
                    {skills.map((skill, index) => (
                      <span key={`${skill}-${index}`}>{skill}</span>
                    ))}
                  </div>
                ) : (
                  <p className="cv-empty">Not provided</p>
                )
              )}

              {renderCvSection(
                "PROFESSIONAL EXPERIENCE",
                <>
                  <div className="cv-experience-item">
                    <div className="cv-experience-heading">
                      <h3>{formData.lastDesignation || "Designation"}</h3>
                      <span>
                        {formData.totalExperience
                          ? `${formData.totalExperience} Years Experience`
                          : ""}
                      </span>
                    </div>
                    <p className="cv-company">
                      {formData.lastCompany || "Company not provided"}
                    </p>
                  </div>

                  {renderCvList(formData.pastCompaniesList)}
                </>
              )}

              {renderCvSection(
                "KEY PROJECTS",
                renderCvList(formData.projectsList)
              )}

              <footer className="cv-footer">
                {formData.fullName} | Professional Resume
              </footer>
            </article>

            {/* PAGE 2 */}
            <article className="cv-page">
              <header className="cv-page-heading">
                <h1>{formData.fullName}</h1>
                <p>PROFESSIONAL PROFILE</p>
              </header>

              {renderCvSection(
                "EDUCATION",
                <>
                  <div className="cv-education-item">
                    <h3>{formData.degreeName || "Qualification"}</h3>
                    <p>
                      Passing Year: {formData.passingYear || "Not provided"}
                    </p>
                  </div>

                  {renderCvList(formData.schoolCollegeDetails)}
                </>
              )}

              {renderCvSection(
                "PROJECT EXPERIENCE",
                renderCvList(formData.projectsList)
              )}

              {renderCvSection(
                "TECHNICAL EXPERTISE",
                skills.length ? (
                  <ul className="cv-list">
                    {skills.map((skill, index) => (
                      <li key={`${skill}-detail-${index}`}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="cv-empty">Not provided</p>
                )
              )}

              {renderCvSection(
                "ADDITIONAL INFORMATION",
                <div className="cv-additional-info">
                  {formData.totalExperience && (
                    <p>
                      <strong>Total Experience:</strong>{" "}
                      {formData.totalExperience} years
                    </p>
                  )}
                  {formData.address && (
                    <p>
                      <strong>Location:</strong> {formData.address}
                    </p>
                  )}
                  {formData.email && (
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                  )}
                  {formData.contact && (
                    <p>
                      <strong>Phone:</strong> {formData.contact}
                    </p>
                  )}
                </div>
              )}

              <footer className="cv-footer">
                {formData.fullName} | Professional Resume
              </footer>
            </article>
          </div>

          <div className="cv-bottom-actions no-print">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowCv(false)}
            >
              Edit Form Details
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={handlePrint}
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiStepForm;
