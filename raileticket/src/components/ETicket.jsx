
import React, { useState } from "react";

const initialFormData = {
  passengerName: "",
  age: "",
  gender: "Male",
  phone: "",
  fromStation: "Ahmedabad (ADI)",
  toStation: "Mumbai Central (MMCT)",
  journeyDate: "",
  seatPreference: "Lower",
};

const ETicket = () => {
  // ૧. ફોર્મ ડેટા સ્ટોર કરવા માટે State
  const [formData, setFormData] = useState(initialFormData);

  // ૨. ટિકિટ અને Errors માટે State
  const [ticketData, setTicketData] = useState(null);
  const [errors, setErrors] = useState({});

  // ૩. Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Input બદલાય ત્યારે તે field નો error દૂર કરો
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // ૪. Form Validation
  const validateForm = () => {
    const formErrors = {};

    // Passenger Name
    if (!formData.passengerName.trim()) {
      formErrors.passengerName = "Passenger Name is Mandatory To Provide!";
    }

    // Age
    if (!formData.age.trim()) {
      formErrors.age = "Passenger Age is Mandatory To Provide!";
    } else if (
      !/^\d+$/.test(formData.age) ||
      Number(formData.age) <= 0 ||
      Number(formData.age) > 120
    ) {
      formErrors.age = "Please Provide Correct Age!";
    }

    // Journey Date
    if (!formData.journeyDate) {
      formErrors.journeyDate = "Please Select Travel Date!";
    }

    // From Station and To Station
    if (formData.fromStation === formData.toStation) {
      formErrors.toStation =
        "Origin & Destination Stations Should Not Be Same!";
    }

    // Mobile Number
    if (!formData.phone.trim()) {
      formErrors.phone = "Passenger Mob Number is Mandatory To Provide!!";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      formErrors.phone =
        "Mob Number Should be Of 10 Digits!";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // ૫. Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTicketData(null);
      return;
    }

    // Demo PNR Generate
    const randomPNR = Math.floor(
      1000000000 + Math.random() * 9000000000
    );

    // Demo Seat Number
    const randomSeat = Math.floor(1 + Math.random() * 72);

    // Demo Coach
    const coaches = ["S1", "S2", "B1", "B2", "A1"];

    const randomCoach =
      coaches[Math.floor(Math.random() * coaches.length)];

    // Ticket Data
    setTicketData({
      ...formData,
      pnr: randomPNR,
      coach: randomCoach,
      seatNumber: randomSeat,
    });
  };

  // ૬. Form Reset
  const handleReset = () => {
    setFormData(initialFormData);
    setTicketData(null);
    setErrors({});
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "30px 15px",
        color: "#1e293b",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE: RAILWAY BOOKING FORM */}

        <div
          style={{
            flex: "1.2",
            minWidth: "340px",
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            borderTop: "6px solid #2563eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            <span style={{ fontSize: "24px" }}>🚂</span>

            <h3 style={{ margin: 0, color: "#2563eb" }}>
              Railway Seat Booking System
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {/* PASSENGER NAME */}

            <div>
              <label style={labelStyle}>
                Passenger Full Name:
              </label>

              <input
                type="text"
                name="passengerName"
                value={formData.passengerName}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter full name"
              />

              {errors.passengerName && (
                <small style={errorStyle}>
                  ⚠️ {errors.passengerName}
                </small>
              )}
            </div>

            {/* AGE AND GENDER */}

            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Age:</label>

                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Age"
                  maxLength="3"
                />

                {errors.age && (
                  <small style={errorStyle}>
                    ⚠️ {errors.age}
                  </small>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Gender:</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={selectStyle}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* FROM AND TO STATION */}

            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>From Station:</label>

                <select
                  name="fromStation"
                  value={formData.fromStation}
                  onChange={handleInputChange}
                  style={selectStyle}
                >
                  <option value="Ahmedabad (ADI)">
                    Ahmedabad (ADI)
                  </option>
                  <option value="Surat (ST)">Surat (ST)</option>
                  <option value="Vadodara (BRC)">
                    Vadodara (BRC)
                  </option>
                  <option value="Rajkot (RJT)">
                    Rajkot (RJT)
                  </option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>To Station:</label>

                <select
                  name="toStation"
                  value={formData.toStation}
                  onChange={handleInputChange}
                  style={selectStyle}
                >
                  <option value="Mumbai Central (MMCT)">
                    Mumbai Central (MMCT)
                  </option>
                  <option value="New Delhi (NDLS)">
                    New Delhi (NDLS)
                  </option>
                  <option value="Surat (ST)">Surat (ST)</option>
                  <option value="Vadodara (BRC)">
                    Vadodara (BRC)
                  </option>
                  <option value="Ahmedabad (ADI)">
                    Ahmedabad (ADI)
                  </option>
                  <option value="Rajkot (RJT)">
                    Rajkot (RJT)
                  </option>
                </select>

                {errors.toStation && (
                  <small style={errorStyle}>
                    ⚠️ {errors.toStation}
                  </small>
                )}
              </div>
            </div>

            {/* JOURNEY DATE AND SEAT PREFERENCE */}

            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>
                  Date of Journey:
                </label>

                <input
                  type="date"
                  name="journeyDate"
                  value={formData.journeyDate}
                  onChange={handleInputChange}
                  style={inputStyle}
                  min={new Date().toISOString().split("T")[0]}
                />

                {errors.journeyDate && (
                  <small style={errorStyle}>
                    ⚠️ {errors.journeyDate}
                  </small>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>
                  Seat Preference:
                </label>

                <select
                  name="seatPreference"
                  value={formData.seatPreference}
                  onChange={handleInputChange}
                  style={selectStyle}
                >
                  <option value="Lower">
                    Lower Seat
                  </option>
                  <option value="Middle">
                    Middle Seat
                  </option>
                  <option value="Upper">
                    Upper Seat
                  </option>
                  <option value="Side Lower">Side Lower</option>
                  <option value="Side Upper">Side Upper</option>
                </select>
              </div>
            </div>

            {/* MOBILE NUMBER */}

            <div>
              <label style={labelStyle}>Mobile Number:</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData((previousData) => ({
                    ...previousData,
                    phone: value.slice(0, 10),
                  }));

                  setErrors((previousErrors) => ({
                    ...previousErrors,
                    phone: "",
                  }));
                }}
                style={inputStyle}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
              />

              {errors.phone && (
                <small style={errorStyle}>
                  ⚠️ {errors.phone}
                </small>
              )}
            </div>

            {/* ACTION BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(37,99,235,0.2)",
                }}
              >
                Book Train Ticket 🎫
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#e2e8f0",
                  color: "#475569",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: GENERATED TICKET */}

        <div
          style={{
            flex: "1",
            minWidth: "340px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ticketData ? (
            <div
              style={{
                width: "100%",
                maxWidth: "380px",
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "2px solid #ea580c",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {/* TICKET HEADER */}

              <div
                style={{
                  backgroundColor: "#ea580c",
                  color: "#fff",
                  padding: "15px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                  }}
                >
                  INDIAN RAILWAYS E-TICKET
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#ffedd5",
                    marginTop: "3px",
                    fontWeight: "bold",
                  }}
                >
                  🎯 ELECTRONIC RESERVATION SLIP
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "15px",
                    fontSize: "20px",
                    opacity: 0.5,
                  }}
                >
                  🇮🇳
                </div>
              </div>

              {/* PNR AND STATUS */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                  padding: "12px 15px",
                  backgroundColor: "#fff7ed",
                  borderBottom: "1px dashed #fed7aa",
                  fontSize: "13px",
                }}
              >
                <div>
                  PNR No:{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#ea580c",
                    }}
                  >
                    {ticketData.pnr}
                  </span>
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    color: "#16a34a",
                  }}
                >
                  🟢 CNF (DEMO)
                </div>
              </div>

              {/* ROUTE DETAILS */}

              <div
                style={{
                  padding: "20px 15px",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#1e3a8a",
                    }}
                  >
                    {ticketData.fromStation}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      color: "#94a3b8",
                    }}
                  >
                    ➔
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#1e3a8a",
                    }}
                  >
                    {ticketData.toStation}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <span>Date: {ticketData.journeyDate}</span>
                  <span>Class: Sleeper (SL)</span>
                </div>
              </div>

              {/* PASSENGER DETAILS */}

              <div
                style={{
                  padding: "20px 15px",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                      display: "block",
                    }}
                  >
                    PASSENGER NAME
                  </span>

                  <strong style={{ textTransform: "uppercase" }}>
                    {ticketData.passengerName} ({ticketData.age} Yrs,{" "}
                    {ticketData.gender})
                  </strong>
                </div>

                {/* COACH AND SEAT DETAILS */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "10px",
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: "12px",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  <div style={ticketBoxStyle}>
                    <span style={ticketLabelStyle}>COACH</span>
                    <strong style={ticketValueStyle}>
                      {ticketData.coach}
                    </strong>
                  </div>

                  <div style={ticketBoxStyle}>
                    <span style={ticketLabelStyle}>SEAT NO</span>
                    <strong style={ticketValueStyle}>
                      {ticketData.seatNumber}
                    </strong>
                  </div>

                  <div style={ticketBoxStyle}>
                    <span style={ticketLabelStyle}>BERTH</span>
                    <strong
                      style={{
                        color: "#ea580c",
                        fontSize: "13px",
                      }}
                    >
                      {ticketData.seatPreference}
                    </strong>
                  </div>
                </div>
              </div>

              {/* TICKET FOOTER */}

              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#f8fafc",
                  borderTop: "1px dashed #cbd5e1",
                  textAlign: "center",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    letterSpacing: "2px",
                    color: "#475569",
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  |||| | ||| || ||| | ||
                </div>

                Contact Support: +91 {ticketData.phone}
                <br />
                Happy Journey ☀️
              </div>
            </div>
          ) : (
            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "16px",
                width: "100%",
                maxWidth: "340px",
                minHeight: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontSize: "14px",
                textAlign: "center",
                padding: "25px",
                boxSizing: "border-box",
              }}
            >
              🎫 Press Book Button After Fill Up Details,Your Demo Ticket Will Be Generated Here..!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// COMMON STYLES

const labelStyle = {
  fontSize: "13px",
  fontWeight: "bold",
  display: "block",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  boxSizing: "border-box",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#2a161613",
  fontSize: "14px",
  boxSizing: "border-box",
};

const errorStyle = {
  color: "#ef4444",
  fontSize: "11px",
  display: "block",
  marginTop: "4px",
};

const ticketBoxStyle = {
  backgroundColor: "#ffffff4b",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
};

const ticketLabelStyle = {
  fontSize: "11px",
  color: "#64748b",
  display: "block",
};

const ticketValueStyle = {
  color: "#2563eb",
  fontSize: "15px",
};

export default ETicket;
