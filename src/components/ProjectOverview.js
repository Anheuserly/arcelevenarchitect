import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/ProjectOverview.css';

/**
 * ProjectOverview component displays the project overview section with detailed information.
 * It fetches data from Google Sheets to display project details.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.projectName - The name of the project.
 * @param {string} props.scope - The scope of the project.
 * @param {string} props.objectives - The key objectives and goals of the project.
 * @returns {JSX.Element} - The Project Overview section component.
 */
const ProjectOverview = () => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    scope: '',
    objectives: '',
  });

  useEffect(() => {
    // Fetch data from Google Sheets
    const sheetId = '1Byispy-mwJWegwRZRF7BBtYGWKUS1scqZAoTo-Of3X4';
    const range = 'Projects!A7:C7'; // The range in your sheet (Project Name, Scope, Objectives)
    const apiKey = 'AIzaSyB_n7jq9b4oHPziaeD2CKrVOLNhS1KId7g'; // Your Google Sheets API key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        // Extract the data from the response and set it to state
        const data = response.data.values[0];
        if (data) {
          setProjectData({
            projectName: data[0], // Project Name from A7
            scope: data[1],        // Scope from B7
            objectives: data[2],   // Objectives from C7
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Google Sheets:', error);
      });
  }, []);

  return (
    <section className="project-overview">
      <div className="overview-content">
        <h2>Project Overview: {projectData.projectName}</h2>
        <p><strong>Scope:</strong> {projectData.scope}</p>
        <p><strong>Objectives:</strong> {projectData.objectives}</p>
      </div>
    </section>
  );
};

// Prop validation for the component
ProjectOverview.propTypes = {
  projectName: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  objectives: PropTypes.string.isRequired,
};

export default ProjectOverview;
