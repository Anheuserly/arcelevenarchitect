

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Projects & Portfolio – Arc 11 Architect | Architecture & Interior Design",
  description:
    "Explore the portfolio of Arc 11 Architect featuring residential and commercial architecture, interior design, renovation, and turnkey projects across Delhi NCR, Noida, Gurgaon, Ghaziabad, and beyond.",
  keywords: [
    "Arc 11 Architect projects",
    "architecture portfolio Delhi NCR",
    "interior design projects Delhi NCR",
    "residential architecture projects",
    "commercial architecture projects",
    "interior renovation projects",
    "villa design projects",
    "apartment interior projects",
    "architecture firm portfolio India",
  ],
  alternates: { canonical: "https://www.arcelevenarchitect.com/projects" },
};

const projects = [
  {
    title: "Private Residence, 8000 Sq, Ft Built-Up",
    location: "Signature City, Ghazibad",
    year: "2021",
    category: "Residential",
    description:
      "As Arc 11 Architect, we designed a modern classical villa located in Ghaziabad's Signature City. The project blends timeless classical elements with contemporary design, offering a sophisticated living space.",
    client: "Mr. Vikram Rathore, Indian AirForce",
    area: "Ghaziabad",
    status: "On-Going",
    imageUrl: "https://via.placeholder.com/800x600?text=Private+Residence",
  },
  {
    title: "Jorbagh Villa, 4800 Sq Ft Built-Up",
    location: "Near Pari Chowk, Greater Noida",
    year: "2022",
    category: "Residential",
    description:
      "As Arc 11 Architect, we designed the interior of a villa in Greater Noida's Jor Bagh, embracing a minimalist theme. The design focuses on clean lines, open spaces, and a neutral color palette.",
    client: "Mr. Hemant",
    area: "Greater Noida",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=Jorbagh+Villa",
  },
  {
    title: "4 BHK Apartment, Builder Floor, P-37",
    location: "Gurgaon",
    year: "2024",
    category: "Residential",
    description:
      "For a builder floor project in Gurgaon’s South City, we at Arc 11 Architect created a modern interior design with a unique parametric outlook.",
    client: "Mr. Manish Srivastava",
    area: "Gurgaon South City",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=4BHK+Apartment",
  },
  {
    title: "Micro 2 BHK Apartment",
    location: "Chhatarpur",
    year: "2023",
    category: "Residential",
    description:
      "For a 2 BHK apartment renovation in Chhatarpur, South Delhi, we at Arc 11 Architect embraced a minimal interior design with a vibrant pop of color theme.",
    client: "Mrs. Nisha",
    area: "Chhatarpur Enclave",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=Micro+2BHK",
  },
  {
    title: "GERMANY 3 BHK APARTMENT",
    location: "Germany",
    year: "2022",
    category: "Residential",
    description:
      "For a 3 BHK apartment in Germany, we at Arc 11 Architect provided 3D interior design and rendering services, incorporating a modern minimal dark theme.",
    client: "Inga Kroll",
    area: "Germany",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=Germany+Apartment",
  },
  {
    title: "Builder Floor, MIRA BAGH",
    location: "Mira Bagh",
    year: "2023",
    category: "Residential",
    description:
      "For JDM Builder's project in Janakpuri Mira Bagh, we created an elegant interior design in a modern classical theme.",
    client: "JMD BUILDER",
    area: "Janakpuri",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=Mira+Bagh",
  },
  {
    title: "PRIVATE VILLA, 4500 Sq. Ft.",
    location: "Raj Nagar Extension",
    year: "2023",
    category: "Residential",
    description:
      "A turnkey project in Raj Nagar Extension combining innovative architectural design with modern living solutions.",
    client: "Mr. Tushar Tyagi",
    area: "Raj Nagar Extenion",
    status: "On-Going",
    imageUrl: "https://via.placeholder.com/800x600?text=Private+Villa",
  },
  {
    title: "SARITA VIHAR 3BHK APARTMENT",
    location: "Sairta Vihar",
    year: "2024",
    category: "Residential",
    description:
      "Interior renovation focused on a perfect blend of comfort and luxury, transforming the living space into a stylish sanctuary.",
    client: "Mrs. Priyanka",
    area: "Pocket A",
    status: "On-Going",
    imageUrl: "https://via.placeholder.com/800x600?text=Sarita+Vihar",
  },
  {
    title: "MIRA BAGH EXTERIOR ELEVATION",
    location: "Janakpuri",
    year: "2022",
    category: "Residential",
    description:
      "Worked on diverse exterior elevation designs across Delhi NCR, covering modern, semi-modern, classical, and Roman-Persian inspired designs.",
    client: "Various",
    area: "Delhi NCR",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=Mira+Bagh+Exterior",
  },
  {
    title: "NOIDA WINDSOR COURT",
    location: "Noida",
    year: "2024",
    category: "Residential",
    description:
      "Ongoing residential renovation project in Windsor Court Society with a focus on contemporary modern interiors.",
    client: "Noida",
    area: "Windsor Court, Noida",
    status: "On-Going",
    imageUrl: "https://via.placeholder.com/800x600?text=Windsor+Court",
  },
  {
    title: "AIIMS",
    location: "DELHI",
    year: "2019",
    category: "Commercial",
    description:
      "3D designing of interiors and exterior landscape of the Extension Block at AIIMS Hospital, New Delhi.",
    client: "HSCC (India) LIMITED",
    area: "AIIMS, New Delhi",
    status: "Completed",
    imageUrl: "https://via.placeholder.com/800x600?text=AIIMS",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Projects</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore a selection of our completed and ongoing architectural and interior design projects.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Year:</strong> {project.year}</p>
                  <p><strong>Category:</strong> {project.category}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
