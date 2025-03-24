// src/components/ContactInfo.js
import React from 'react';

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <h2>Contact Information</h2>
      <ul>
        <li>
          <strong>Phone:</strong> +91 8527378555
        </li>
        <li>
          <strong>Email:</strong> arcelevenarchitect@gmail.com 
        </li>
        <li>
          <strong>Address:</strong> D 21 Chattarpur<br />New Delhi, DL 110074
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
