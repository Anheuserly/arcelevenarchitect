// components/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Logo from "../static/Arcelevenarchitect_logo.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={Logo}
                alt="Arc Eleven Architect Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'} hidden sm:block`}>
                Arc 11 Architect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive("/") ? "text-red-500" : isScrolled ? "text-gray-700" : "text-white"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive("/projects") ? "text-red-500" : isScrolled ? "text-gray-700" : "text-white"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive("/about") ? "text-red-500" : isScrolled ? "text-gray-700" : "text-white"
                } hover:text-red-500 transition-colors duration-300`}
              >
                About
              </Link>
              <Link
                href="/expertise"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive("/expertise") ? "text-red-500" : isScrolled ? "text-gray-700" : "text-white"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Expertise
              </Link>
              <Link
                href="/journal"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive("/journal") ? "text-red-500" : isScrolled ? "text-gray-700" : "text-white"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Journal
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive("/contact") ? "text-red-500" : isScrolled ? "text-gray-700" : "text-white"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/"
              className="block text-gray-700 text-lg py-2 hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="block text-gray-700 text-lg py-2 hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 text-lg py-2 hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/expertise"
              className="block text-gray-700 text-lg py-2 hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Expertise
            </Link>
            <Link
              href="/journal"
              className="block text-gray-700 text-lg py-2 hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 text-lg py-2 hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
