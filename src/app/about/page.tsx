import Image from "next/image";
import React from "react";
import "../styles/About.css";

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
        {/* Header */}
        <div className="about-header">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Learn more about our journey, mission, vision, and values.
          </p>
        </div>

        {/* Intro */}
        <div className="about-intro">
          <p>
            ARC 11 ARCHITECT is a creative architecture studio dedicated to
            crafting thoughtful and innovative design solutions. Since 2015,
            we&apos;ve specialized in{" "}
            <strong>architecture, construction, and interior design</strong>,
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

        {/* Mission & Vision */}
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

        {/* Values */}
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

        {/* Team Section */}
        <section className="about-team">
          <h2 className="about-team-title">Meet Our Team</h2>
          <p className="about-team-subtitle">
            The creative minds shaping the identity of ARC 11 ARCHITECT.
          </p>

          <div className="about-team-grid">
            {/* Team Member 1 */}
            <div className="about-team-card">
              <div className="about-team-photo">
                <Image
                  src="/images/team-placeholder.jpg"
                  alt="Shashank Saini - Founder"
                  width={120}
                  height={120}
                  className="team-photo"
                />
              </div>
              <h3 className="team-name">Shashank Saini</h3>
              <p className="team-role">Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="about-team-card">
              <div className="about-team-photo">
                <Image
                  src="/images/team-placeholder.jpg"
                  alt="Ujjwal Sinha - Co-Founder"
                  width={120}
                  height={120}
                  className="team-photo"
                />
              </div>
              <h3 className="team-name">Ujjwal Sinha</h3>
              <p className="team-role">Co-Founder</p>
            </div>

            {/* Team Member 3 */}
            <div className="about-team-card">
              <div className="about-team-photo">
                <Image
                  src="/images/team-placeholder.jpg"
                  alt="Sohel Latif - Partner"
                  width={120}
                  height={120}
                  className="team-photo"
                />
              </div>
              <h3 className="team-name">Sohel Latif</h3>
              <p className="team-role">Partner</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
