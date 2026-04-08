"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Gradient background — Cascade HVAC blue tones */}
      <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0">
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-[#0094cc] to-[#0176a2]"></div>
        <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-[#004E6A] to-[#377186]"></div>
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-[#00B4D8] to-[#0176a2]"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto flex items-center justify-between px-4 py-4 mt-6">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Cascade HVAC Ltd"
              className="h-10 w-auto object-contain invert mix-blend-screen"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <NavItem label="Services" href="/services" />
              <NavItem label="Gallery" href="/gallery" />
              <NavItem label="About" href="/about" />
              <NavItem label="Contact" href="/contact" />
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="tel:4032644622"
                className="flex items-center gap-2 h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                403.264.4622
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col p-4 bg-black/95 md:hidden"
            >
              <div className="flex items-center justify-between">
                <img
                  src="/logo.png"
                  alt="Cascade HVAC Ltd"
                  className="h-10 w-auto object-contain invert mix-blend-screen"
                />
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-6">
                <MobileNavItem label="Services" href="/services" />
                <MobileNavItem label="Gallery" href="/gallery" />
                <MobileNavItem label="About" href="/about" />
                <MobileNavItem label="Contact" href="/contact" />
                <div className="pt-4">
                  <a
                    href="tel:4032644622"
                    className="flex items-center justify-center gap-2 w-full border border-gray-700 text-white rounded-full py-3"
                  >
                    <Phone className="h-4 w-4" />
                    403.264.4622
                  </a>
                </div>
                <a
                  href="#quote"
                  className="flex items-center justify-center h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
                >
                  Get a Free Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge */}
        <div className="mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">
            Trusted HVAC Experts Since 2006
          </span>
          <ArrowRight className="h-4 w-4 text-white" />
        </div>

        {/* Hero section */}
        <div className="container mx-auto mt-12 px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Alberta&apos;s Trusted HVAC Experts
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Commercial, industrial &amp; residential heating, ventilation, and air
            conditioning. A quote is a quote — there are never surprising extras.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a
              href="#quote"
              className="h-12 flex items-center rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90 transition-colors"
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              className="h-12 flex items-center rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              Our Services
            </a>
          </div>

          <div className="relative mx-auto my-20 w-full max-w-6xl">
            <div className="absolute inset-0 rounded shadow-lg bg-[#0094cc] blur-[10rem] opacity-20" />

            {/* Hero Image — HVAC commercial building */}
            <img
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80&auto=format&fit=crop"
              alt="Commercial HVAC rooftop units on a modern building"
              className="relative w-full h-auto shadow-md rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function NavItem({ label, href }) {
  return (
    <Link
      href={href}
      className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
    >
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ label, href }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white"
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 text-gray-400" />
    </Link>
  );
}

export { Hero };
