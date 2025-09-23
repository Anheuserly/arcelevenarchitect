import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProjectGallery.css';

/**
 * ProjectGalleryItem component displays the project details.
 */
const ProjectGalleryItem = ({ title, location, year, category, description, client, area, status, imageUrl }) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <div className="project-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className="project-overlay">
          <div className="project-quick-info">
            <span className="project-category">{category}</span>
            <span className="project-year">{year}</span>
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <div className="project-header">
          <h2 className="project-title">{title}</h2>
          <h3 className="project-location">{location}</h3>
        </div>
        
        <div className="project-details">
          <div className="project-description">
            <p>{description}</p>
          </div>
          
          <div className="project-meta">
            <div className="meta-item">
              <span className="meta-label">Client</span>
              <span className="meta-value">{client}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Area</span>
              <span className="meta-value">{area}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value">{status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation for the component
ProjectGalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

/**
 * ProjectGallery component displays the project gallery with filtering capabilities.
 */
const ProjectGallery = () => {
  // Static project data
  const projectsData = [
    {
      title: 'Private Residence, 8000 Sq, Ft Built-Up',
      location: 'Signature City, Ghazibad',
      year: '2021',
      category: 'Residential',
      description: 'As Arc 11 Architect, we designed a modern classical villa located in Ghaziabad\'s Signature City. The project blends timeless classical elements with contemporary design, offering a sophisticated living space.',
      client: 'Mr. Vikram Rathore, Indian AirForce',
      area: 'Ghaziabad',
      status: 'On-Going',
      imageUrl: 'https://via.placeholder.com/800x600?text=Private+Residence'
    },
    {
      title: 'Jorbagh Villa, 4800 Sq Ft Built-Up',
      location: 'Near Pari Chowk, Greater Noida',
      year: '2022',
      category: 'Residential',
      description: 'As Arc 11 Architect, we designed the interior of a villa in Greater Noida\'s Jor Bagh, embracing a minimalist theme. The design focuses on clean lines, open spaces, and a neutral color palette.',
      client: 'Mr. Hemant',
      area: 'Greater Noida',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=Jorbagh+Villa'
    },
    {
      title: '4 BHK Apartment, Builder Floor, P-37',
      location: 'Gurgaon',
      year: '2024',
      category: 'Residential',
      description: 'For a builder floor project in Gurgaon\'s South City, we at Arc 11 Architect created a modern interior design with a unique parametric outlook.',
      client: 'Mr. Manish Srivastava',
      area: 'Gurgaon South City',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=4BHK+Apartment'
    },

    {
      title: 'Micro 2 BHK Apartment',
      location: 'Chhatarpur',
      year: '2023',
      category: 'Residential',
      description: 'For a 2 BHK apartment renovation in Chhatarpur, South Delhi, we at Arc 11 Architect embraced a minimal interior design with a vibrant pop of color theme. The design focuses on clean, uncluttered spaces with a neutral base palette, accentuated by bold pops of color in key areas such as feature walls, furniture, and decor items.',
      client: 'Mrs. Nisha',
      area: 'Chhatarpur Enclave',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=Micro+2BHK'
    },
    {
      title: 'GERMANY 3 BHK APARTMENT',
      location: 'Germany',
      year: '2022',
      category: 'Residential',
      description: 'For a 3 BHK apartment in Germany, we at Arc 11 Architect provided 3D interior design and rendering services for a builder, incorporating a modern minimal dark theme. The design focuses on sleek, clean lines with dark hues, creating a sophisticated and calming atmosphere.',
      client: 'Inga Kroll',
      area: 'Germany',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=Germany+Apartment'
    },
    {
      title: 'Builder Floor, MIRA BAGH',
      location: 'Mira Bagh',
      year: '2023',
      category: 'Residential',
      description: 'For JDM Builder\'s project in Janakpuri Mira Bagh, we at Arc 11 Architect created an elegant interior design in a modern classical theme. The design seamlessly blends timeless classical elements, such as intricate moldings and rich materials, with contemporary features for a sophisticated, luxurious atmosphere.',
      client: 'JMD BUILDER',
      area: 'Janakpuri',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=Mira+Bagh'
    },
    {
      title: 'PRIVATE VILLA, 4500 Sq. Ft.',
      location: 'Raj Nagar Extension',
      year: '2023',
      category: 'Residential',
      description: 'As Arc 11 Architect, we are working on a turnkey project in Raj Nagar Extension, where our goal is to design and deliver the client\'s dream home. The project combines innovative architectural design with modern living solutions to create a space that reflects comfort, style, and functionality.',
      client: 'Mr. Tushar Tyagi',
      area: 'Raj Nagar Extenion',
      status: 'On-Going',
      imageUrl: 'https://via.placeholder.com/800x600?text=Private+Villa'
    },
    {
      title: 'SARITA VIHAR 3BHK APARTMENT',
      location: 'Sairta Vihar',
      year: '2024',
      category: 'Residential',
      description: 'As an interior designer and architect, we recently completed an interior renovation focused on providing our client with a perfect blend of comfort and luxury. The design aimed to transform their living space into a serene and stylish sanctuary, enhancing both functionality and aesthetics.',
      client: 'Mrs. Priyanka',
      area: 'Pocket A',
      status: 'On-Going',
      imageUrl: 'https://via.placeholder.com/800x600?text=Sarita+Vihar'
    },
    {
      title: 'MIRA BAGH EXTERIOR ELEVATION',
      location: 'Janakpuri',
      year: '2022',
      category: 'Residential',
      description: 'At Arc 11 Architect, we\'ve had the privilege of working on a diverse range of exterior elevation designs for various clients across Delhi NCR. Our projects span multiple architectural styles, including modern, semi-modern, classical modern, and Roman and Persian-inspired designs.',
      client: 'Various',
      area: 'Delhi NCR',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=Mira+Bagh+Exterior'
    },
    {
      title: 'NOIDA WINDSOR COURT',
      location: 'Noida',
      year: '2024',
      category: 'Residential',
      description: 'We are currently working on an ongoing residential renovation project in Nida Windsor Court Society, where our focus is to provide a contemporary modern interior style for our client. The design aims to create a fresh, functional, and stylish living space, combining clean lines, sleek finishes, and a neutral color palette with carefully chosen accent elements.',
      client: 'Noida',
      area: 'Windsor Court, Noida',
      status: 'On-Going',
      imageUrl: 'https://via.placeholder.com/800x600?text=Windsor+Court'
    },
    {
      title: 'AIIMS',
      location: 'DELHI',
      year: '2019',
      category: 'Commercial',
      description: 'As Arc 11 Architect, We have been entrusted with the task of 3D designing both the interiors and exterior landscape of the Extension Block at AIIMS Hospital in New Delhi.',
      client: 'HSCC (India) LIMITED',
      area: 'AIIMS, New Delhi',
      status: 'Completed',
      imageUrl: 'https://via.placeholder.com/800x600?text=AIIMS'
    }
  ];

  const [filter, setFilter] = useState('all');

  // Get unique categories for filter
  const categories = ['all', ...new Set(projectsData.map(item => item.category))];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(item => item.category === filter);

  return (
    <div className="project-gallery-container">
      <div className="gallery-header">
        <h1>Our Projects</h1>
        <p>Explore our portfolio of architectural excellence</p>
        
        <div className="filter-controls">
          {categories.map(category => (
            <button 
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((item, index) => (
            <ProjectGalleryItem
              key={index}
              title={item.title}
              location={item.location}
              year={item.year}
              category={item.category}
              description={item.description}
              client={item.client}
              area={item.area}
              status={item.status}
              imageUrl={item.imageUrl}
            />
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;