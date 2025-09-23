

import Link from "next/link";
import React from "react";

// Import images (make sure these exist in /public or /assets folder)
import architecturalImg from "../../../public/services/architectural.jpg";
import interiorImg from "../../../public/services/interior.jpg";
import urbanImg from "../../../public/services/urban.jpg";
import landscapeImg from "../../../public/services/landscape.jpg";
import structuralImg from "../../../public/services/structural.jpg";
import mepImg from "../../../public/services/mep.jpg";
import computationalImg from "../../../public/services/computational.jpg";
import sustainabilityImg from "../../../public/services/sustainability.jpg";

export const metadata = {
  title: "Our Services - ARC 11 ARCHITECT | Architecture & Interior Design",
  description:
    "ARC 11 ARCHITECT offers architecture, interior, urban, landscape, structural, MEP, computational/BIM, and sustainable design solutions for residential and commercial projects.",
  alternates: { canonical: "https://www.arcelevenarchitect.com/services" },
};

const services = [
  {
    id: 1,
    title: "Architectural Design",
    description: "Comprehensive design services for new buildings and structures, from concept to completion.",
    image: architecturalImg,
  },
  {
    id: 2,
    title: "Interior Design",
    description: "Thoughtful interior spaces that complement the architecture and enhance user experience.",
    image: interiorImg,
  },
  {
    id: 3,
    title: "Urban Design & Planning",
    description: "Creating cohesive, sustainable urban environments that foster community and connection.",
    image: urbanImg,
  },
  {
    id: 4,
    title: "Landscape Design",
    description: "Designing outdoor spaces that blend functionality with aesthetics.",
    image: landscapeImg,
  },
  {
    id: 5,
    title: "Structural Engineering",
    description: "Ensuring stability and durability of buildings with expert engineering solutions.",
    image: structuralImg,
  },
  {
    id: 6,
    title: "MEP Engineering",
    description: "Mechanical, Electrical, and Plumbing solutions for efficient building performance.",
    image: mepImg,
  },
  {
    id: 7,
    title: "Computational Design & BIM",
    description: "Advanced computational tools and BIM for precise modeling, planning, and collaboration.",
    image: computationalImg,
  },
  {
    id: 8,
    title: "Sustainability & Resilience",
    description: "Eco-friendly and resilient designs promoting energy efficiency and sustainable development.",
    image: sustainabilityImg,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            ARC 11 ARCHITECT provides a comprehensive suite of services for residential and commercial projects, from architecture and interior design to structural, MEP, and sustainable solutions.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={service.image.src}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 inline-block">
            <h2 className="text-2xl font-bold text-gray-900">Looking for a custom solution?</h2>
            <p className="mt-2 text-gray-600">We tailor our architectural and design services to meet your unique project requirements.</p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
