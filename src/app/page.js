// app/page.tsx (Updated - Navigation removed)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-['Helvetica_Neue']">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background with architectural image */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            transform: `translateY(${scrollPosition * 0.5}px)`,
            transition: "transform 0.1s ease-out",
            backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Abstract architectural grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-white/10 rounded-lg"></div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-white/10 rounded-lg"></div>
            <div className="absolute top-2/5 left-2/5 w-1/5 h-1/5 border border-white/10 rounded-lg"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            ARC 11 ARCHITECT
          </h1>
          <div className="h-1 w-24 bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Architectural excellence through innovative design and meticulous craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/projects" 
              className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              View Our Work
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-white text-gray-900 font-medium hover:bg-transparent hover:text-white border-2 border-white transition-colors duration-300"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white mt-2 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Rest of your page content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Who We Are</h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            ARC 11 ARCHITECT is a creative studio specializing in architecture,
            interior design, and construction. Since 2021, we've been
            transforming visions into reality with innovative and sustainable
            solutions tailored to modern lifestyles.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-5xl font-extrabold mb-3">500+</div>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-3">10+</div>
              <p className="text-gray-300">Years of Experience</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-3">98%</div>
              <p className="text-gray-300">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-3">24/7</div>
              <p className="text-gray-300">Support & Consultation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Let's Build Together
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            From homes and offices to large-scale developments — we design with
            creativity, precision, and purpose.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-gray-900 text-white text-lg font-semibold hover:bg-gray-700 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}