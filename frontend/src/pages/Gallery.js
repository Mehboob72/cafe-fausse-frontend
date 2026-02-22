import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      title: 'Elegant Main Dining Room',
      category: 'Interior',
      alt: 'Luxurious dining room with crystal chandeliers',
      src: '/images/home-cafe-fausse.webp'
    },
    {
      id: 2,
      title: 'Intimate Dining Space',
      category: 'Interior',
      alt: 'Elegant dining room with ornate ceiling',
      src: '/images/gallery-cafe-interior.webp'
    },
    {
      id: 3,
      title: 'Signature Ribeye Steak',
      category: 'Main Dishes',
      alt: 'Perfectly cooked ribeye steak with seasonal vegetables',
      src: '/images/gallery-ribeye-steak.webp'
    },
    {
      id: 4,
      title: 'Special Event Celebration',
      category: 'Events',
      alt: 'Elegant special event dining setup',
      src: '/images/gallery-special-event.webp'
    },
    {
      id: 5,
      title: 'Crystal Chandelier Detail',
      category: 'Ambiance',
      alt: 'Ornate crystal chandelier',
      src: '/images/gallery-cafe-interior.webp'
    },
    {
      id: 6,
      title: 'Fine Dining Experience',
      category: 'Dining',
      alt: 'Luxurious table setting',
      src: '/images/gallery-special-event.webp'
    },
    {
      id: 7,
      title: 'Culinary Excellence',
      category: 'Main Dishes',
      alt: 'Gourmet steak presentation',
      src: '/images/gallery-ribeye-steak.webp'
    },
    {
      id: 8,
      title: 'Grand Dining Hall',
      category: 'Interior',
      alt: 'Spacious elegant dining area',
      src: '/images/home-cafe-fausse.webp'
    }
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="gallery-page">
      {/* Header Section */}
      <section className="gallery-header">
        <div className="container">
          <h1 className="page-title">Gallery</h1>
          <p className="page-subtitle">
            A visual journey through the culinary artistry and ambiance of Café Fausse
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <div className="gallery-image-wrapper">
                  {/* REAL IMAGE - CHANGED FROM PLACEHOLDER */}
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <h3 className="gallery-title">{image.title}</h3>
                    <p className="gallery-category">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Description */}
      <section className="gallery-info">
        <div className="container">
          <div className="info-content">
            <h2>Visual Excellence</h2>
            <p>
              Every dish at Café Fausse is not only a delight for the palate but also a 
              feast for the eyes. Our gallery showcases the artistry and attention to detail 
              that goes into each creation, from the careful plating of our signature dishes 
              to the elegant ambiance of our dining spaces.
            </p>
            <p>
              We believe that dining is a multisensory experience, and presentation plays a 
              crucial role in that journey. Browse through our collection to get a glimpse 
              of what awaits you at Café Fausse.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <FaTimes />
          </button>
          
          <button 
            className="lightbox-prev" 
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrapper">
              {/* REAL IMAGE IN LIGHTBOX - CHANGED FROM PLACEHOLDER */}
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="lightbox-image"
              />
            </div>
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>

          <button 
            className="lightbox-next" 
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>

          <div className="lightbox-counter">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;