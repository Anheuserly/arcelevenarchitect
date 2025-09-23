"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import RequestForm from '../../../components/RequestForm';
import React from 'react';

const serviceCategories = [
  {
    id: "fire-protection",
    title: "Fire Protection Systems",
    description: "Comprehensive fire protection installation for buildings and facilities",
    icon: "🔥",
    features: ["Sprinkler Systems", "Fire Hydrants", "Fire Pumps", "Standpipes"],
    details: "Our fire protection systems are designed to provide comprehensive coverage for your facility. We install, maintain, and inspect all types of fire protection systems to ensure compliance with local regulations and optimal safety performance."
  },
  {
    id: "fire-suppression",
    title: "Fire Suppression Systems",
    description: "Advanced suppression systems for specialized environments",
    icon: "🧯",
    features: ["Clean Agent Systems", "CO2 Systems", "Kitchen Hood Systems", "FM-200"],
    details: "Specialized suppression systems for environments where water-based systems may cause damage or be ineffective. We provide clean agent, CO2, and other specialized suppression solutions."
  },
  {
    id: "detection-systems",
    title: "Detection Systems",
    description: "Early warning systems to detect fire emergencies",
    icon: "📟",
    features: ["Smoke Detectors", "Heat Detectors", "Alarm Systems", "Monitoring"],
    details: "Early detection is crucial for effective fire response. Our detection systems provide reliable early warning and can be integrated with monitoring services for 24/7 protection."
  },
  {
    id: "amc-services",
    title: "AMC Services",
    description: "Annual Maintenance Contracts for ongoing protection",
    icon: "🔧",
    features: ["Regular Inspections", "System Testing", "24/7 Support", "Documentation"],
    details: "Ensure your fire safety systems remain in optimal condition with our comprehensive Annual Maintenance Contracts. We provide regular inspections, testing, and documentation to maintain compliance and reliability."
  },
  {
    id: "fire-extinguishers",
    title: "Fire Extinguishers",
    description: "Portable firefighting equipment for immediate response",
    icon: "🧨",
    features: ["ABC Type", "CO2 Type", "Specialty Types", "Refilling Services"],
    details: "Portable fire extinguishers are essential first-response tools. We supply, install, and maintain all types of fire extinguishers with regular inspection and refilling services."
  },
  {
    id: "consultation",
    title: "Consultation & Planning",
    description: "Expert guidance for fire safety compliance",
    icon: "📋",
    features: ["Risk Assessment", "Compliance Audit", "Evacuation Planning", "Training"],
    details: "Our expert consultants provide comprehensive fire safety planning, risk assessments, compliance audits, and training programs to ensure your organization is prepared for emergencies."
  }
];

export default function ServiceCategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  
  const service = serviceCategories.find(s => s.id === categoryId);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
          <Link href="/services" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link href="/services" className="text-gray-400 hover:text-gray-500">
                Services
              </Link>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-gray-500">{service.title}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-xl">
                {service.icon}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Service Details</h2>
              <p className="text-gray-600 mb-6">{service.details}</p>
              
              <h3 className="text-md font-medium text-gray-900 mb-3">What's Included</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Request This Service</h2>
              <RequestForm serviceType={service.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}