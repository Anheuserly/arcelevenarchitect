import React from "react";
import "../styles/About.css"; // adjust path if needed

export const metadata = {
  title: "About Us - ARC 11 ARCHITECT",
  description:
    "ARC 11 ARCHITECT is a creative architecture studio crafting thoughtful and innovative design solutions. Since 2021, we’ve specialized in architecture, construction, and interior design, delivering modern spaces that balance aesthetics with functionality across Chhatarpur, New Delhi.",
  alternates: { canonical: "https://www.arcelevenarchitect.com/about" },
};

export default function Page() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Learn more about our journey, mission, vision, and values.
          </p>
        </div>

        <div className="about-intro">
          <p>
            ARC 11 ARCHITECT is a creative architecture studio dedicated to
            crafting thoughtful and innovative design solutions. Since 2015,
            we&apos;ve specialized in <strong>architecture, construction, and interior design</strong>,
            delivering modern spaces that balance striking aesthetics with
            practical functionality.
          </p>
          <p>
            Passionate about creating environments that reflect your vision, we
            focus on quality, detail, and timeless design for lasting impact.
            From concept to completion, our team ensures sustainable and visually
            stunning results tailored to your needs. Serving the{" "}
            <strong>Chhatarpur area of New Delhi</strong>, we are committed to
            bringing your architectural dreams to life.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h2 className="about-card-title">Our Mission</h2>
            <p className="about-card-text">
              To design and deliver innovative spaces that seamlessly integrate
              aesthetics with functionality while prioritizing sustainability and
              client satisfaction.
            </p>
          </div>

          <div className="about-card">
            <h2 className="about-card-title">Our Vision</h2>
            <p className="about-card-text">
              To be recognized as a leading architecture studio in New Delhi,
              setting benchmarks in modern design, construction, and interiors
              with a focus on creativity, innovation, and excellence.
            </p>
          </div>
        </div>

        <div className="about-values">
          <h2 className="about-values-title">Our Values</h2>
          <div className="about-values-grid">
            <div>
              <h3 className="about-value-heading">Innovation</h3>
              <p className="about-value-text">
                We embrace creativity and cutting-edge design approaches to
                deliver unique, forward-thinking spaces.
              </p>
            </div>
            <div>
              <h3 className="about-value-heading">Excellence</h3>
              <p className="about-value-text">
                We maintain the highest standards in design, execution, and
                client relationships for every project.
              </p>
            </div>
            <div>
              <h3 className="about-value-heading">Collaboration</h3>
              <p className="about-value-text">
                We value teamwork and close collaboration with clients, partners,
                and stakeholders to bring visions to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
