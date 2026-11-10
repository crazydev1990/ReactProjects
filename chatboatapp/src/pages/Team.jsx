import React from "react";

const team = [
  {
    icon: "🧭",
    title: "Strategy & Planning",
    description: "Business analysis, technical planning and project direction."
  },
  {
    icon: "👨‍💻",
    title: "Development Team",
    description: "Building reliable applications and modern web experiences."
  },
  {
    icon: "🎨",
    title: "Design Team",
    description: "Creating clear, attractive and user-friendly interfaces."
  },
  {
    icon: "🤝",
    title: "Customer Success",
    description: "Helping clients throughout their digital journey."
  }
];

const Team = () => {

  return (

    <div className="inner-page">

      <section className="page-banner">

        <span className="eyebrow">OUR PEOPLE</span>

        <h1>Meet The Cloudify Team</h1>

        <p>Different skills, one shared vision.</p>

      </section>

      <section className="section">

        <div className="section-container">

          <div className="section-heading">

            <h2>Working Together</h2>

            <p>
              Our team structure brings planning, creativity,
              engineering and customer support together.
            </p>

          </div>

          <div className="team-grid">

            {team.map((member) => (

              <div className="team-card" key={member.title}>

                <div className="team-avatar">
                  {member.icon}
                </div>

                <h3>{member.title}</h3>

                <p>{member.description}</p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>

  );

};

export default Team;