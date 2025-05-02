import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProjectHero.css';

const ProjectHero = ({ title, description, backgroundImage }) => {
  return (
    <section 
      className="project-hero" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-label={title}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

ProjectHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default ProjectHero;
