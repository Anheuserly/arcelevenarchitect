// app/profile/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import ProfilePic from "../../static/Arcelevenarchitect_logo.png"; // Replace with actual image

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Shashank Saini</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Founder & Lead Architect at ARC 11 ARCH, specializing in innovative architectural design, interior solutions, and sustainable construction across Delhi NCR.
          </p>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src={ProfilePic}
              alt="Shashank Saini"
              width={250}
              height={250}
              className="rounded-full shadow-lg"
            />
          </div>

          {/* Bio & Details */}
          <div className="flex-1 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">About Me</h2>
              <p className="text-gray-700 leading-relaxed">
                With years of experience in architectural and interior design, I focus on creating spaces that combine aesthetics, functionality, and sustainability. My passion is to bring clients’ visions to life with innovative design solutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Expertise</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Architectural Design</li>
                <li>Interior Design</li>
                <li>Construction Planning & Execution</li>
                <li>Sustainable & Eco-Friendly Solutions</li>
                <li>Project Consultation & Management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Contact</h2>
              <ul className="text-gray-700 space-y-1">
                <li>Email: <a href="mailto:arcelevenarchitect@gmail.com" className="text-indigo-600 hover:text-indigo-800">arcelevenarchitect@gmail.com</a></li>
                <li>Phone: <a href="tel:+919871936847" className="text-indigo-600 hover:text-indigo-800">+91-9871936847</a></li>
                <li>Location: New Delhi, India</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Follow Me</h2>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/shashank_saini/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">Instagram</a>
                <a href="https://www.linkedin.com/in/shashank-saini/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                <a href="https://twitter.com/shashank_saini" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="https://koloapp.in/delhi/architects/shashank-saini--delhi" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">KoloApp</a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
