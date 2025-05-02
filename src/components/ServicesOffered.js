import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ServicesOffered.css';

// Import images
import architecturalImg from '../path/image/services/architectural.jpg';
import interiorImg from '../path/image/services/interior.jpg';
import urbanImg from '../path/image/services/urban.jpg';
import landscapeImg from '../path/image/services/landscape.jpg';
import structuralImg from '../path/image/services/structural.jpg';
import mepImg from '../path/image/services/mep.jpg';
import civilImg from '../path/image/services/civil.jpg';
import computationalImg from '../path/image/services/computational.jpg';
import sustainabilityImg from '../path/image/services/sustainability.jpg';
import solutionImg from '../path/image/services/solution.jpg';

const services = [
  {
    id: 1,
    title: 'Architectural Design',
    description: 'Comprehensive design services for new buildings and structures, from concept to completion.',
    image: architecturalImg,
  },
  {
    id: 2,
    title: 'Interior Design',
    description: 'Thoughtful interior spaces that complement the architecture and enhance the user experience.',
    image: interiorImg,
  },
  {
    id: 3,
    title: 'Urban Design and Planning',
    description: 'Creating cohesive, sustainable urban environments that foster community and connection.',
    image: urbanImg,
  },
  {
    id: 4,
    title: 'Landscape Design',
    description: 'Designing outdoor spaces that blend functionality with aesthetics.',
    image: landscapeImg,
  },
  {
    id: 5,
    title: 'Structural Engineering',
    description: 'Ensuring the stability and durability of buildings with expert engineering solutions.',
    image: structuralImg,
  },
  {
    id: 6,
    title: 'MEP Engineering',
    description: 'Mechanical, Electrical, and Plumbing solutions for efficient building performance.',
    image: mepImg,
  },
  {
    id: 7,
    title: 'Civil Engineering',
    description: 'Comprehensive infrastructure and construction management services.',
    image: civilImg,
  },
  {
    id: 8,
    title: 'Computational Design & BIM',
    description: 'Utilizing advanced computational tools for precise modeling and planning.',
    image: computationalImg,
  },
  {
    id: 9,
    title: 'Sustainability / Resilience',
    description: 'Eco-friendly designs that promote resilience and sustainability.',
    image: sustainabilityImg,
  },
  {
    id: 10,
    title: 'Solution',
    description: 'Bespoke solutions for complex architectural and engineering challenges.',
    image: solutionImg,
  }
];

const ServicesOffered = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const [expandedMobileService, setExpandedMobileService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleMobileService = (service) => {
    if (expandedMobileService === service.id) {
      setExpandedMobileService(null);
    } else {
      setExpandedMobileService(service.id);
      setActiveService(service);
    }
  };

  return (
    <section className="services-offered">
      <div className="services-container">
        {/* Left Sidebar */}
        <div className="services-sidebar">
          <h2 className="sidebar-title">Our Expertise</h2>
          <div className="services-list">
            {services.map(service => (
              <div key={service.id} className="service-item-wrapper">
                <div 
                  className={`service-item ${activeService.id === service.id ? 'active' : ''} ${expandedMobileService === service.id ? 'expanded' : ''}`} 
                  onClick={() => isMobile ? toggleMobileService(service) : setActiveService(service)}
                  style={isMobile ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                >
                  <span className="service-text">{service.title}</span>
                  {!isMobile && activeService.id === service.id && (
                    <motion.div 
                      className="service-underline"
                      layoutId="underline"
                    />
                  )}
                  {isMobile && (
                    <span className={`mobile-toggle ${expandedMobileService === service.id ? 'open' : ''}`}>
                      {expandedMobileService === service.id ? '−' : '+'}
                    </span>
                  )}
                </div>
                
                {/* Mobile expanded content */}
                {isMobile && (
                  <AnimatePresence>
                    {expandedMobileService === service.id && (
                      <motion.div 
                        className="mobile-service-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          backgroundImage: `url(${service.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="mobile-service-overlay">
                          <p className="mobile-service-description">{service.description}</p>
                          <Link to={`/services/${service.id}`} className="detail-link">
                            Learn more <span className="arrow">→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Content Display - Only visible on desktop */}
        <div className="services-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeService.id}
              className="service-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="service-image-container">
                <div 
                  className="service-image" 
                  style={{ backgroundImage: `url(${activeService.image})` }}
                ></div>
                <div className="service-info-overlay">
                  <h2 className="detail-title">{activeService.title}</h2>
                  <p className="detail-description">{activeService.description}</p>
                  <Link to={`/services/${activeService.id}`} className="detail-link">
                    Learn more <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;