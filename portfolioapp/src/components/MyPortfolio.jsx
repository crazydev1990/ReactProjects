
import React, { useState } from "react";

const MyPortfolio = () => {

  // ==========================================
  // 1. STATES
  // ==========================================

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");

  // ==========================================
  // 2. MOUSE TRACKING
  // ==========================================

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePos({ x, y });
  };

  // ==========================================
  // 3. CONTACT FORM
  // ==========================================

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus("❌ Please fill out all required details!");
      return;
    }

    setFormStatus("✅ Your message has been recorded successfully!");

    setName("");
    setEmail("");
    setMessage("");
  };

  // ==========================================
  // 4. SKILLS DATA
  // ==========================================

  const skillCategories = {
    "Frontend Technologies": [
      { name: "HTML", level: "🔥 Advanced" },
      { name: "CSS", level: "🎨 Fluid" },
      { name: "JavaScript", level: "⚡ Advanced" },
      { name: "Bootstrap", level: "🚀 Production" },
      { name: "ReactJS", level: "⚡ Advanced" },
      { name: "Next.js", level: "🚀 Production" },
      { name: "TailwindCSS", level: "🎨 Fluid" }
    ],

    "Backend Technologies": [
      { name: "Node.js", level: "🔥 Scalable" },
      { name: "Express.js", level: "🛠️ APIs" },
      { name: "Laravel", level: "☁️ Live" },
      { name: "CodeIgniter", level: "🔥 Scalable" },
      { name: "Yii2", level: "🔥 Scalable" },
      { name: "Core PHP", level: "⚡ Advanced" }
    ],

    "CMS (Content Management)": [
      { name: "WordPress", level: "📦 Development" }
    ],

    "Other Tech Stack": [
      { name: "Git & Version Control", level: "🐙 Collaboration" },
      { name: "OOPs Principles", level: "🧠 Architecture" },
      { name: "AWS Cloud Services", level: "⚙️ Deployment" },
      { name: "MySQL", level: "🗄️ Database" },
      { name: "Stripe Payment Gateway", level: "💳 Integration" },
      { name: "REST APIs", level: "🔗 Integration" }
    ]
  };

  // ==========================================
  // 5. EDUCATIONAL QUALIFICATION
  // ==========================================

  const educationData = [
    {
      degree: "BCA (Bachelor of Computer Application)",
      institute: "Gujarat University",
      year: "2013",
      percentage: "63% (First Class)"
    },
    {
      degree: "HSC",
      institute: "Shree Sahjanand Higher Secondary School",
      year: "2008",
      percentage: "69%"
    },
    {
      degree: "SSC",
      institute: "Shree Samarth Vidyavihar High School",
      year: "2006",
      percentage: "73%"
    }
  ];

  // ==========================================
  // 6. PROFESSIONAL EXPERIENCE
  // ==========================================

  const experienceData = [
    {
      role: "Senior Software Engineer",
      company: "Nuwave Communications",
      duration: "Feb2025-Jan2026",
      experience: "1 Years Overall Experience",

      technologies: [
        "Core PHP",
        "Laravel",
        "Yii2",       
        "MySQL",
        "REST API",       
        "Git"
      ],

      responsibilities: [
        "Have Worked On Restful APIs & IPILOT Portal.",
        "Optimizing application performance and database queries.",
        "Implementing secure coding practices and debugging.",
        "Collaborating with teams to deliver quality software solutions."
      ]
    },
    {
      role: "Senior PHP Developer",
      company: "Neovify Technolabs Pvt Ltd",
      duration: "Apr2019-Jul2024",
      experience: "5 Years Overall Experience",

      technologies: [
        "Core PHP",
        "Laravel",
        "WordPress",
        "MySQL",
        "REST API",
        "AWS",
        "Git"
      ],

      responsibilities: [
        "Developing scalable and user-friendly web applications.",
        "Building and maintaining backend systems, CMS and REST APIs.",
        "Integrating payment gateways and third-party services.",
        "Optimizing application performance and database queries.",
        "Implementing secure coding practices and debugging.",
        "Collaborating with teams to deliver quality software solutions."
      ]
    },
    {
      role: "Senior PHP Developer",
      company: "TechnoAdviser Technologies Pvt Ltd",
      duration: "July2017 - Mar2019",
      experience: "1.5 Years Overall Experience",

      technologies: [
        "Core PHP",
        "WordPress",
        "MySQL",
        "REST API",
        "AWS",
        "Git"
      ],

      responsibilities: [
        "Developing scalable and user-friendly web applications.",
        "Building and maintaining backend systems, CMS and REST APIs.",
        "Integrating payment gateways and third-party services.",
        "Optimizing application performance and database queries.",
        "Implementing secure coding practices and debugging.",
        "Collaborating with teams to deliver quality software solutions."
      ]
    },
    {
      role: "Junior PHP Developer",
      company: "Eleventh Infosoft Pvt Ltd",
      duration: "Nov2015 - Nov2016",
      experience: "1 Years Overall Experience",

      technologies: [
        "Core PHP",
        "MySQL",
        "REST API",
        "AWS",
        "Git"
      ],

      responsibilities: [
        "Developing scalable and user-friendly web applications.",
        "Building and maintaining backend systems, CMS and REST APIs.",
        "Integrating payment gateways and third-party services.",
        "Optimizing application performance and database queries.",
        "Implementing secure coding practices and debugging.",
        "Collaborating with teams to deliver quality software solutions."
      ]
    },
    {
      role: "OffPage SEO",
      company: "AnuvaTech",
      duration: "Nov 2014 - Aug 2015 ·",
      experience: "10Months Overall Experience",

      technologies: [
        "OffPage Seo",
        "Link Building",
      ],

      responsibilities: [
        "Web Directories Submission.",
        "Classified Directories Submission.",
        "Business Directories Submission.",
        "Articles Submissions",
        "Press Release Submission."   
      ]
    }
  ];

  // ==========================================
  // 7. PROJECT SHOWCASE
  // ==========================================

  const projectCategories = [
    {
      technology: "Core PHP / Custom Development",
      projects: [
        {
          name: "StreamlyTV",
          url: "https://streamlytv.com/",
          description: "Web application development and backend integrations.",
          technologies: ["PHP", "MySQL", "JavaScript", "AWS"]
        },
        {
          name: "Innroom Media",
          url: "https://www.innroommedia.com/",
          description: "Custom web application and backend development.",
          technologies: ["PHP", "MySQL", "JavaScript"]
        }
      ]
    },

    {
      technology: "Laravel",
      projects: [
        {
          name: "StreamlyTV",
          url: "https://streamlytv.com/",
          description: "Admin panel, payment integration and subscription-related backend functionality.",
          technologies: ["Laravel", "MySQL", "Stripe", "AWS S3", "SNS"]
        },
        {
          name: "Development Innroom Media",
          url: "https://www.innroommedia.com/",
          description: "Backend development and application integrations.",
          technologies: ["Laravel", "PHP", "MySQL", "REST API"]
        }
      ]
    },

    {
      technology: "Yii2",
      projects: [
        {
          name: "IPILOT Portal",
          description: "Portal development, API updates, performance optimization and security improvements.",
          technologies: ["Yii2", "PHP", "MySQL", "REST API"]
        }
      ]
    },
    {
      technology: "ReactJs",
      projects: [
        {
          name: "ToDo Task Manager",
          url:"https://mytodotaskmanagerlist.netlify.app/",
          description: "Manage Task List.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "TicTacToe",
          url:"https://tictacttoegamecustom.netlify.app/",
          description: "Tic tac toe game.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "Recipe Finder",
          url:"https://myrecipefinderappcustom.netlify.app",
          description: "Recipe Finder With API.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
          {
          name: "NetFlix Clone",
          url:"https://mycustomnetlifyapp.netlify.app",
          description: "Custom Netflix Clone.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "Mario Game",
          url:"https://marioreactjsyash.netlify.app/",
          description: "Mario game.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "LinkedIn Timeline App",
          url:"https://mytimelineappcustom.netlify.app",
          description: "Recipe Finder With API.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "Google Drive Clone",
          url:"https://mydrivecustomapp.netlify.app",
          description: "Google Drive Clone.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "Gmail Clone App",
          url:"https://mycustomgmailapp.netlify.app",
          description: "Gmail Clone.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "Google Drive Clone",
          url:"https://mydrivecustomapp.netlify.app",
          description: "Google Drive Clone.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "Git Profile Finder App",
          url:"https://gitprofilesearchappcustom.netlify.app/",
          description: "Git Profile Finder.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "ECommerCe Store",
          url:"https://mycustomecommercestore.netlify.app",
          description: "Custom Ecommerce Store App.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "User Dashboard App",
          url:"https://mycustomdashboardapp.netlify.app/",
          description: "Custom Dashboard App.",
          technologies: ["ReactJs", "NextJs", "HTML", "CSS", "JavaScript"]
        }
      ]
    },

    {
      technology: "WordPress",
      projects: [
        {
          name: "Impressions India",
          url:"https://www.impressions-india.com/",
          description: "WordPress website customization and development.",
          technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"]
        },
        {
          name: "See My Options",
          url:"https://www.seemyoptions.com/",
          description: "WordPress theme and functionality customization.",
          technologies: ["WordPress", "PHP", "MySQL"]
        },
        {
          name: "DocuCam",
          url: "https://www.docucam.com/",
          description: "WordPress development and website customization.",
          technologies: ["WordPress", "PHP", "CSS", "JavaScript"]
        },
        {
          name: "Neovix",
          url: "https://www.neovix.com/",
          description: "WordPress development and website customization.",
          technologies: ["WordPress", "PHP", "CSS", "JavaScript"]
        },
        {
          name: "Neovify",
          url: "https://www.neovify.com/",
          description: "WordPress development and website customization.",
          technologies: ["WordPress", "PHP", "CSS", "JavaScript"]
        },
        {
          name: "MyEyeApp",
          url: "https://myeyeapp.net/",
          description: "WordPress website development and customization.",
          technologies: ["WordPress", "PHP", "MySQL"]
        },
        {
          name: "Lettrix",
          url: "https://www.lettrix.net/",
          description: "WordPress website and feature customization.",
          technologies: ["WordPress", "PHP", "HTML", "CSS"]
        }
      ]
    }
  ];

  // ==========================================
  // 8. STAR POSITIONS
  // ==========================================

  const stars = [
    { top: "12%", left: "12%" },
    { top: "24%", left: "28%" },
    { top: "15%", left: "48%" },
    { top: "35%", left: "82%" },
    { top: "55%", left: "8%" },
    { top: "70%", left: "20%" },
    { top: "78%", left: "42%" },
    { top: "65%", left: "72%" },
    { top: "48%", left: "92%" },
    { top: "85%", left: "88%" },
    { top: "30%", left: "62%" },
    { top: "8%", left: "75%" },
    { top: "90%", left: "55%" },
    { top: "45%", left: "35%" }
  ];

  // ==========================================
  // 9. CARTOON EYES
  // ==========================================

  const CartoonEyes = ({ large = false }) => (
    <div className={`cartoon-eyes ${large ? "large-eyes" : ""}`}>
      {[1, 2].map((item) => (
        <div className="eye" key={item}>
          <div
            className="pupil"
            style={{
              transform: `translate(
                ${mousePos.x * (large ? 5 : 3)}px,
                ${mousePos.y * (large ? 5 : 3)}px
              )`
            }}
          />
        </div>
      ))}
    </div>
  );

  // ==========================================
  // 10. MAIN UI
  // ==========================================

  return (
    <div className="portfolio-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        .portfolio-page {
          background: #020617;
          color: #f8fafc;
          min-height: 100vh;
          font-family: "Segoe UI", Roboto, sans-serif;
          padding: 40px 20px;
          overflow-x: hidden;
        }

        /* HERO */

        .night-hero {
          width: 100%;
          max-width: 1050px;
          min-height: 510px;
          margin: 0 auto 60px;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid #334155;
          background:
            radial-gradient(circle at 50% 45%, #172554 0%, #0f172a 55%, #020617 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          isolation: isolate;
          cursor: crosshair;
          padding: 65px 20px;
        }

        /* STARS */

        @keyframes twinkle {
          0%, 100% {
            opacity: .35;
            transform: scale(.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        .cartoon-star {
          position: absolute;
          z-index: 2;
          color: #fff;
          font-size: 24px;
          animation: twinkle 2s ease-in-out infinite;
          pointer-events: none;
        }

        .star-face {
          position: relative;
          display: inline-block;
          filter: drop-shadow(0 0 7px white);
        }

        /* EYES */

        .cartoon-eyes {
          position: absolute;
          top: 7px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 3px;
          z-index: 3;
        }

        .eye {
          width: 7px;
          height: 10px;
          background: white;
          border-radius: 50%;
          border: 1px solid #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pupil {
          width: 4px;
          height: 6px;
          background: #020617;
          border-radius: 50%;
          transition: transform .12s ease-out;
        }

        /* MOON */

        @keyframes moonFloat {
          0%, 100% {
            transform: rotate(-5deg) translateY(0);
          }
          50% {
            transform: rotate(5deg) translateY(-8px);
          }
        }

        .moon-face {
          position: absolute;
          right: 7%;
          top: 7%;
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 20px rgba(255,255,255,.8),
                      0 0 55px rgba(255,255,255,.35);
          z-index: 5;
          animation: moonFloat 4s ease-in-out infinite;
        }

        .moon-face .cartoon-eyes {
          top: 34px;
          gap: 14px;
        }

        .moon-face .eye {
          width: 15px;
          height: 20px;
          border: 1px solid #64748b;
        }

        .moon-face .pupil {
          width: 7px;
          height: 9px;
        }

        .moon-smile {
          position: absolute;
          left: 50%;
          top: 62px;
          transform: translateX(-50%);
          width: 25px;
          height: 12px;
          border-bottom: 3px solid #0f172a;
          border-radius: 0 0 50% 50%;
        }

        /* CLOUDS */

        @keyframes cloudLeft {
          0%, 100% {
            transform: translateX(-25px);
          }
          50% {
            transform: translateX(65px);
          }
        }

        @keyframes cloudRight {
          0%, 100% {
            transform: translateX(35px);
          }
          50% {
            transform: translateX(-65px);
          }
        }

        .cartoon-cloud {
          position: absolute;
          font-size: 90px;
          opacity: .75;
          z-index: 1;
          pointer-events: none;
        }

        .cloud-one {
          left: -25px;
          top: 20%;
          animation: cloudLeft 9s ease-in-out infinite;
        }

        .cloud-two {
          right: -25px;
          bottom: 12%;
          animation: cloudRight 11s ease-in-out infinite;
        }

        .cloud-three {
          left: 35%;
          bottom: 3%;
          font-size: 60px;
          opacity: .35;
          animation: cloudLeft 13s ease-in-out infinite;
        }

        /* TWO DOVES */

        @keyframes doveLeftToRight {
          0% {
            left: -10%;
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-16px) rotate(8deg);
          }
          50% {
            transform: translateY(5px) rotate(-4deg);
          }
          75% {
            transform: translateY(-12px) rotate(6deg);
          }
          100% {
            left: 110%;
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes doveRightToLeft {
          0% {
            right: -10%;
            transform: translateY(0) scaleX(-1);
          }
          25% {
            transform: translateY(15px) scaleX(-1);
          }
          50% {
            transform: translateY(-12px) scaleX(-1);
          }
          75% {
            transform: translateY(8px) scaleX(-1);
          }
          100% {
            right: 110%;
            transform: translateY(0) scaleX(-1);
          }
        }

        .dove {
          position: absolute;
          top: 31%;
          font-size: 42px;
          z-index: 6;
          pointer-events: none;
          filter: drop-shadow(0 5px 12px rgba(255,255,255,.5));
        }

        .dove-one {
          left: -10%;
          animation: doveLeftToRight 13s linear infinite;
        }

        .dove-two {
          right: -10%;
          top: 43%;
          font-size: 34px;
          animation: doveRightToLeft 16s linear infinite;
          animation-delay: 2s;
        }

        /* HERO CONTENT - NO TEXT CUTTING */

        .hero-content {
          position: relative;
          z-index: 7;
          padding: 20px 15px 30px;
          width: 100%;
          max-width: 850px;
          min-width: 0;
          pointer-events: none;
          overflow: visible;
        }

        .hero-name {
          display: block;
          width: 100%;
          max-width: 100%;
          margin: 0 auto 16px;
          padding: 8px 8px 12px;
          font-size: clamp(32px, 5.5vw, 55px);
          line-height: 1.3;
          font-weight: 900;
          letter-spacing: .5px;
          white-space: normal;
          overflow: visible;
          overflow-wrap: anywhere;
          word-break: normal;
          background: linear-gradient(90deg, #fff, #bae6fd, #c4b5fd, #fff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-role {
          color: #e2e8f0;
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 500;
          line-height: 1.5;
          margin: 0 0 15px;
        }

        .hero-description {
          max-width: 700px;
          margin: auto;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.7;
          overflow-wrap: break-word;
        }

        /* GENERAL CONTAINER */

        .portfolio-container {
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .section-title,
        .portfolio-extra-title {
          color: #38bdf8;
          margin: 0 0 25px;
          font-size: 24px;
          border-left: 4px solid #38bdf8;
          padding-left: 12px;
          font-weight: 700;
        }

        /* SKILLS */

        .skill-groups {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .skill-category {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 16px;
          padding: 20px;
        }

        .skill-category h4 {
          margin: 0 0 15px;
          color: #a78bfa;
          font-size: 16px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 15px;
        }

        .skill-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 10px;
          padding: 12px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          transition: all .2s ease-in-out;
          transform: perspective(400px) rotateX(4deg);
          box-shadow: 0 4px 6px rgba(0,0,0,.15);
        }

        .skill-card:hover {
          transform: perspective(400px) translateZ(8px);
          border-color: #38bdf8;
        }

        .skill-name {
          font-weight: 500;
          color: #f1f5f9;
          font-size: 14px;
        }

        .skill-level {
          font-size: 11px;
          color: #38bdf8;
          font-weight: 600;
          background: #020617;
          padding: 3px 8px;
          border-radius: 12px;
          white-space: nowrap;
        }

        /* EDUCATION */

        .portfolio-extra-section {
          margin-bottom: 10px;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .education-card,
        .experience-card,
        .project-card {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 22px;
          transition: .25s ease;
          min-width: 0;
        }

        .education-card:hover,
        .experience-card:hover,
        .project-card:hover {
          border-color: #38bdf8;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,.2);
        }

        .education-degree {
          color: #a78bfa;
          font-size: 18px;
          margin: 0 0 12px;
          overflow-wrap: anywhere;
        }

        .education-institute {
          color: #f8fafc;
          font-weight: 600;
          margin-bottom: 8px;
          overflow-wrap: anywhere;
        }

        .education-year {
          display: inline-block;
          color: #38bdf8;
          background: #020617;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .education-description {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        /* EXPERIENCE */

        .experience-card {
          border-left: 3px solid #38bdf8;
        }

        .experience-role {
          color: #a78bfa;
          font-size: 21px;
          margin: 0 0 10px;
        }

        .experience-company {
          color: #f8fafc;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .experience-duration {
          color: #38bdf8;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .experience-years {
          color: #4ade80;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .experience-subtitle {
          color: #e2e8f0;
          font-size: 15px;
          margin: 18px 0 10px;
        }

        .experience-list {
          padding-left: 20px;
          margin: 0;
        }

        .experience-list li {
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.8;
          margin-bottom: 5px;
        }

        /* PROJECTS */

        .project-category {
          margin-bottom: 30px;
        }

        .project-category-title {
          color: #a78bfa;
          font-size: 19px;
          margin: 0 0 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #334155;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 18px;
        }

        .project-card h4 {
          color: #f8fafc;
          font-size: 17px;
          margin: 0 0 12px;
        }

        .project-description {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .project-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .project-tech {
          color: #38bdf8;
          background: #020617;
          border: 1px solid #334155;
          border-radius: 20px;
          padding: 5px 10px;
          font-size: 11px;
          font-weight: 600;
        }

        /* CONTACT */

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          border-top: 1px solid #1e293b;
          padding-top: 40px;
          margin-bottom: 40px;
        }

        .contact-card {
          background: #0f172a;
          padding: 25px;
          border-radius: 16px;
          border: 1px solid #1e293b;
        }

        .contact-card h4,
        .social-section h4 {
          margin: 0 0 15px;
          font-size: 18px;
          color: #fff;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-input {
          padding: 11px;
          border-radius: 6px;
          border: 1px solid #334155;
          background: #1e293b;
          color: #fff;
          outline: none;
          font: inherit;
          width: 100%;
        }

        .contact-input:focus {
          border-color: #38bdf8;
        }

        .contact-button {
          padding: 11px;
          background: #38bdf8;
          color: #020617;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }

        .contact-button:hover {
          background: #7dd3fc;
        }

        .form-status {
          font-size: 13px;
          margin: 0;
        }

        /* SOCIAL */

        .social-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 15px;
        }

        .social-section h4 {
          margin: 0;
        }

        .social-section p {
          margin: 0;
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.5;
        }

        .social-link {
          display: block;
          padding: 12px;
          background: #1e293b;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          border: 1px solid #334155;
          transition: .2s;
        }

        .social-link:hover {
          transform: translateY(-3px);
          border-color: #38bdf8;
        }

        .linkedin-link {
          background: #0a66c2;
          border-color: #0a66c2;
        }

        /* FOOTER */

        .portfolio-footer {
          text-align: center;
          border-top: 1px solid #1e293b;
          padding: 20px 0;
          color: #64748b;
          font-size: 13px;
        }

        /* RESPONSIVE */

        @media (max-width: 600px) {

          .portfolio-page {
            padding: 20px 12px;
          }

          .night-hero {
            min-height: 480px;
            padding: 65px 12px;
          }

          .hero-content {
            padding: 15px 5px 25px;
          }

          .hero-name {
            font-size: clamp(30px, 9vw, 42px);
            line-height: 1.35;
            padding: 8px 4px 12px;
            letter-spacing: 0;
          }

          .moon-face {
            width: 70px;
            height: 70px;
            right: 5%;
          }

          .moon-face .cartoon-eyes {
            top: 23px;
          }

          .moon-face .eye {
            width: 12px;
            height: 16px;
          }

          .moon-face .pupil {
            width: 6px;
            height: 8px;
          }

          .moon-smile {
            top: 47px;
          }

          .cartoon-cloud {
            font-size: 60px;
          }

          .dove {
            font-size: 30px;
          }

          .hero-role {
            font-size: 14px;
          }

          .hero-description {
            font-size: 13px;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-extra-title,
          .section-title {
            font-size: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cartoon-cloud,
          .cartoon-star,
          .moon-face,
          .dove {
            animation: none !important;
          }
        }

      `}</style>

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <div className="night-hero" onMouseMove={handleMouseMove}>

        {/* STARS */}

        {stars.map((star, index) => (
          <div
            key={index}
            className="cartoon-star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="star-face">
              ✦
              <CartoonEyes />
            </div>
          </div>
        ))}

        {/* WHITE MOON */}

        <div className="moon-face">
          <CartoonEyes large />
          <div className="moon-smile" />
        </div>

        {/* MOVING CLOUDS */}

        <div className="cartoon-cloud cloud-one">☁️</div>
        <div className="cartoon-cloud cloud-two">☁️</div>
        <div className="cartoon-cloud cloud-three">☁️</div>

        {/* FIRST DOVE: LEFT TO RIGHT */}

        <div className="dove dove-one">🕊️</div>

        {/* SECOND DOVE: RIGHT TO LEFT */}

        <div className="dove dove-two">🕊️</div>

        {/* PROFILE CONTENT */}

        <div className="hero-content">

          <h1 className="hero-name">
            Yashpal Modi
          </h1>

          <h3 className="hero-role">
            Full-Stack Web Developer
          </h3>

          <p className="hero-description">
            Welcome to my digital universe. I build modern,
            scalable and creative web experiences with passion,
            technology and imagination.

            I’m a Web Developer with 7+ years of experience
            building scalable and user-friendly web applications.
            I specialize in backend development using Core PHP,
            Laravel, Yii, and WordPress.

            I have hands-on experience with MVC architecture,
            REST APIs, payment integrations, and performance
            optimization. I focus on writing clean, maintainable
            code and delivering reliable solutions.

            Skilled in MySQL, API integrations, and modern web
            technologies, I enjoy solving real-world problems
            and continuously improving my skills.

            I work well both independently and in teams,
            with a strong focus on quality, deadlines, and results.

            Goal: To grow as a full-stack developer and build
            high-quality, scalable applications that create
            real business impact.
          </p>

        </div>

      </div>

      {/* ==========================================
          MAIN PORTFOLIO CONTAINER
      ========================================== */}

      <div className="portfolio-container">

        {/* SKILLS SECTION */}

        <section>

          <h2 className="section-title">
            Technical Architecture & Stack
          </h2>

          <div className="skill-groups">

            {Object.entries(skillCategories).map(
              ([categoryName, skillList]) => (

                <div className="skill-category" key={categoryName}>

                  <h4>{categoryName}</h4>

                  <div className="skills-grid">

                    {skillList.map((skill) => (

                      <div className="skill-card" key={skill.name}>

                        <span className="skill-name">
                          {skill.name}
                        </span>

                        <span className="skill-level">
                          {skill.level}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              )
            )}

          </div>

        </section>

        {/* ==========================================
            EDUCATIONAL QUALIFICATION
        ========================================== */}

        <section className="portfolio-extra-section">

          <h2 className="portfolio-extra-title">
            Educational Qualification
          </h2>

          <div className="education-grid">

            {educationData.map((education, index) => (

              <div className="education-card" key={index}>

                <h3 className="education-degree">
                  🎓 {education.degree}
                </h3>

                <div className="education-institute">
                  {education.institute}
                </div>

                <span className="education-year">
                  {education.year}
                </span>

                <p className="education-description">
                  {education.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* ==========================================
            PROFESSIONAL EXPERIENCE
        ========================================== */}

        <section className="portfolio-extra-section">

          <h2 className="portfolio-extra-title">
            Professional Experience
          </h2>

          {experienceData.map((experience, index) => (

            <div className="experience-card" key={index}>

              <h3 className="experience-role">
                💼 {experience.role}
              </h3>

              <div className="experience-company">
                {experience.company}
              </div>

              <div className="experience-duration">
                {experience.duration}
              </div>

              <div className="experience-years">
                {experience.experience}
              </div>

              <h4 className="experience-subtitle">
                Technologies & Tools
              </h4>

              <div className="project-tech-list">

                {experience.technologies.map((tech, techIndex) => (

                  <span className="project-tech" key={techIndex}>
                    {tech}
                  </span>

                ))}

              </div>

              <h4 className="experience-subtitle">
                Key Responsibilities
              </h4>

              <ul className="experience-list">

                {experience.responsibilities.map((item, itemIndex) => (

                  <li key={itemIndex}>
                    {item}
                  </li>

                ))}

              </ul>

            </div>

          ))}

        </section>

        {/* ==========================================
            PROJECTS SHOWCASE
        ========================================== */}

        <section className="portfolio-extra-section">

          <h2 className="portfolio-extra-title">
            Projects Showcase
          </h2>

          {projectCategories.map((category, categoryIndex) => (

            <div className="project-category" key={categoryIndex}>

              <h3 className="project-category-title">
                ⚙️ {category.technology}
              </h3>

              <div className="project-grid">

                {category.projects.map((project, projectIndex) => (

                  <div className="project-card" key={projectIndex}>

                    <h4>{project.name}</h4>

                    <p className="project-description">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit'}}>{project.url}</a>
                    </p>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="project-tech-list">

                      {project.technologies.map((tech, techIndex) => (

                        <span className="project-tech" key={techIndex}>
                          {tech}
                        </span>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </section>

        {/* ==========================================
            CONTACT AND SOCIAL SECTION
        ========================================== */}

        <section className="contact-grid">

          {/* CONTACT FORM */}

          <div className="contact-card">

            <h4>Drop a Message</h4>

            <form
              className="contact-form"
              onSubmit={handleContactSubmit}
            >

              <input
                type="text"
                className="contact-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                className="contact-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <textarea
                className="contact-input"
                placeholder="Your message..."
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ resize: "vertical" }}
              />

              <button type="submit" className="contact-button">
                Send Signals
              </button>

              {formStatus && (
                <p
                  className="form-status"
                  style={{
                    color: formStatus.includes("❌")
                      ? "#f87171"
                      : "#4ade80"
                  }}
                >
                  {formStatus}
                </p>
              )}

            </form>

          </div>

          {/* SOCIAL LINKS */}

          <div className="social-section">

            <h4>Open-Source Hub & Networks</h4>

            <p>
              Feel free to explore my work, repositories
              and professional network.
            </p>

            <a
              href="https://github.com/crazydev1990/ProgrammingGuides/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              🐙 Access GitHub Codebase
            </a>

            <a
              href="https://www.linkedin.com/in/yashpal-modi-a7b77b51/"
              target="_blank"
              rel="noreferrer"
              className="social-link linkedin-link"
            >
              💼 Synced LinkedIn Hub
            </a>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="portfolio-footer">
          © {new Date().getFullYear()} Yashpal Modi.
          All rights reserved.
        </footer>

      </div>

    </div>
  );
};

export default MyPortfolio;
