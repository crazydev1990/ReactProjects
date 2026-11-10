import React from "react";

const images = [
  ["photo-1498050108023-c5249f4df085", "Web Development"],
  ["photo-1519389950473-47ba0277781c", "Team Collaboration"],
  ["photo-1553877522-43269d4ea984", "Business Strategy"],
  ["photo-1518770660439-4636190af475", "Technology"],
  ["photo-1521737711867-e3b97375f902", "Creative Team"],
  ["photo-1451187580459-43490279c0fa", "Cloud Infrastructure"],
  ["photo-1497366754035-f200968a6e72", "Modern Workspace"],
  ["photo-1522071820081-009f0129c71c", "Team Meeting"],
  ["photo-1552664730-d307ca884978", "Project Planning"]
];

const Gallery = () => {

  return (

    <div className="inner-page">

      <section className="page-banner">

        <span className="eyebrow">OUR WORK</span>

        <h1>Cloudify Gallery</h1>

        <p>Explore technology, creativity and collaboration.</p>

      </section>

      <section className="section">

        <div className="section-container">

          <div className="gallery-grid">

            {images.map(([image, title]) => (

              <div className="gallery-card gallery-item" key={image}>

                <img
                  src={`https://images.unsplash.com/${image}?w=900`}
                  alt={title}
                  loading="lazy"
                />

                <div className="gallery-caption">
                  {title}
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>

  );

};

export default Gallery;