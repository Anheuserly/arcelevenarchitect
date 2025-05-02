import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/DesignConcept.css';

/**
 * DesignConcept component dynamically loads and displays the architectural design concept.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the design concept.
 * @param {string} props.description - The detailed explanation of the design concept.
 * @param {string} props.imageUrl - URL of the image to visually represent the design concept.
 * @returns {JSX.Element} - The Design Concept section component.
 */
const DesignConcept = ({ title, description, imageUrl }) => {
  return (
    <section className="design-concept">
      <div className="design-concept-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* The background image is set inline */}
      </div>
      <div className="design-concept-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

// Prop validation for the component
DesignConcept.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

/**
 * Function to fetch data from Google Sheets API.
 * @returns {Array} - Array of design concepts with title, description, and image URL.
 */
const fetchDesignConceptData = async () => {
  const sheetID = '1Byispy-mwJWegwRZRF7BBtYGWKUS1scqZAoTo-Of3X4'; // Replace with your Google Sheets ID
  const range = 'Projects!E7:H7'; // Fetching data from E7 to H7 in the 'Projects' sheet
  const apiKey = 'AIzaSyB_n7jq9b4oHPziaeD2CKrVOLNhS1KId7g'; // Replace with your Google Sheets API key

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`
    );
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return [];
  }
};

const DesignConceptPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const designData = await fetchDesignConceptData();
      setData(designData);
    };

    loadData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <DesignConcept
            key={index}
            title={item[0]}         // Project Name (Column E)
            description={item[1]}   // Design Concept Title (Column F)
            imageUrl={item[2]}      // Design Description (Column G)
          />
        ))
      ) : (
        <p>Loading design concepts...</p>
      )}
    </div>
  );
};

export default DesignConceptPage;
