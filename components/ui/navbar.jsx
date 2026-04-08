"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Cascade HVAC Ltd"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#0094cc] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href="tel:4032644622"
            className="flex items-center gap-2 h-11 rounded-full bg-[#0094cc] px-6 text-sm font-medium text-white hover:bg-[#0176a2] transition-colors"
          >
            <Phone className="h-4 w-4" />
            403.264.4622
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/logo.png"
                  alt="Cascade HVAC Ltd"
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <X className="h-6 w-6 text-gray-800" />
              </button>
            </div>
            <div className="flex-1 px-6 py-8 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-gray-100 text-lg font-medium text-gray-800 hover:text-[#0094cc] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <a
                  href="tel:4032644622"
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-full border border-gray-200 text-gray-800 font-medium hover:border-[#0094cc] hover:text-[#0094cc] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  403.264.4622
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center h-12 rounded-full bg-[#0094cc] px-8 text-base font-medium text-white hover:bg-[#0176a2] transition-colors"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
