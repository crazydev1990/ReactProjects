import React from 'react'

const Gallery = () => {
  return (
    <>
    <div className="w-100 bg-white">
      <section className="page-title-section bg-light py-5 text-start border-bottom">
        <div className="container">
          <h1 className="fw-bold text-dark mb-2 fs-2">Portfolio</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a href="#home" className="text-success text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Portfolio</li>
            </ol>
          </nav>
        </div>
      </section>
      <section id="portfolio" className="portfolio-section py-5 my-4">
        <div className="container">
          <div className="row mb-5" data-aos="fade-up">
            <div className="col-12 d-flex justify-content-center">
              <ul className="list-unstyled d-flex gap-4 mb-0 small fw-semibold">
                <li 
                  className="px-3 py-1 rounded-pill text-white bg-success" 
                  style={{ cursor: 'pointer' }}
                >
                  All
                </li>
                <li className="text-secondary px-2 py-1" style={{ cursor: 'pointer' }}>App</li>
                <li className="text-secondary px-2 py-1" style={{ cursor: 'pointer' }}>Card</li>
                <li className="text-secondary px-2 py-1" style={{ cursor: 'pointer' }}>Web</li>
              </ul>
            </div>
          </div>
          <div className="row g-4 row-cols-1 row-cols-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-1.jpg" 
                  alt="Curology Product" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-2.jpg" 
                  alt="Honeycomb Packaging" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-3.jpg" 
                  alt="Succulent Plant Pot" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-1.jpg" 
                  alt="Curology Product" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-2.jpg" 
                  alt="Honeycomb Packaging" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-3.jpg" 
                  alt="Succulent Plant Pot" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-1.jpg" 
                  alt="Curology Product" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-2.jpg" 
                  alt="Honeycomb Packaging" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-3.jpg" 
                  alt="Succulent Plant Pot" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-1.jpg" 
                  alt="Curology Product" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-2.jpg" 
                  alt="Honeycomb Packaging" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
            <div className="col">
              <div className="portfolio-item-box border rounded overflow-hidden shadow-sm h-100 bg-light position-relative">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/masonry-portfolio/masonry-portfolio-3.jpg" 
                  alt="Succulent Plant Pot" 
                  className="img-fluid w-100 h-100" 
                  style={{ objectFit: 'cover', minHeight: '320px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
export default Gallery
