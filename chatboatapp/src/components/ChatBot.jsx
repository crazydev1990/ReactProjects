import React, { useState } from "react";

const ChatBot = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [selectedService, setSelectedService] = useState("");

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI / UX Design",
    "Cloud Solutions",
    "Cyber Security",
    "Technical Consulting"
  ];

  const selectService = (service) => {
    setSelectedService(service);
  };

  const sendEmail = () => {

    const subject = encodeURIComponent(
      `Cloudify Inquiry - ${selectedService}`
    );

    window.location.href =
      `mailto:support@cloudify.example?subject=${subject}`;

  };

  return (

    <div className="chatbot-wrapper">

      {isOpen && (

        <div className="chatbot-panel">

          <div className="chatbot-header">

            <div>
              <strong>Cloudify Support</strong>
              <small>Online Assistance</small>
            </div>

            <button onClick={() => setIsOpen(false)}>
              ✕
            </button>

          </div>

          <div className="chatbot-body">

            <div className="bot-message">
              Hello! Welcome to Cloudify.
              <br />
              How can we help you today?
            </div>

            {!selectedService ? (

              <>
                <p className="chatbot-question">
                  Select a service:
                </p>

                {services.map((service) => (

                  <button
                    key={service}
                    className="chat-option"
                    onClick={() => selectService(service)}
                  >
                    {service}
                  </button>

                ))}

              </>

            ) : (

              <>

                <div className="bot-message">
                  You selected: {selectedService}
                </div>

                <button
                  className="chat-option"
                  onClick={sendEmail}
                >
                  Send Email Inquiry →
                </button>

                <button
                  className="chat-option"
                  onClick={() => setSelectedService("")}
                >
                  Back to Services
                </button>

              </>

            )}

          </div>

          <div className="chatbot-footer">
            Powered by Cloudify
          </div>

        </div>

      )}

      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>

    </div>

  );

};

export default ChatBot;