"use client";

import { useState } from "react";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import ChatWidget from "../../components/ChatWidget";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop",
    alt: "Commercial HVAC rooftop units",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop",
    alt: "Industrial ventilation system",
    category: "Industrial",
  },
  {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop&h=600",
    alt: "Commercial HVAC rooftop installation",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop",
    alt: "Residential furnace installation",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80&auto=format&fit=crop",
    alt: "Industrial warehouse heating system",
    category: "Industrial",
  },
  {
    src: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80&auto=format&fit=crop",
    alt: "Commercial ductwork installation",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
    alt: "Construction site HVAC work",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop",
    alt: "Industrial piping and mechanical",
    category: "Industrial",
  },
  {
    src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80&auto=format&fit=crop",
    alt: "Residential HVAC unit",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&q=80&auto=format&fit=crop",
    alt: "Commercial building exterior with HVAC",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
    alt: "Modern commercial office HVAC system",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80&auto=format&fit=crop",
    alt: "Industrial facility mechanical systems",
    category: "Industrial",
  },
];

const categories = ["All", "Commercial", "Industrial", "Residential"];

const projectCounts = {
  Commercial: 25,
  Industrial: 8,
  Residential: 4,
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Page Header */}
        <section className="bg-gray-50 border-b border-gray-200 py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Project Gallery
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Browse our portfolio of commercial, industrial, and residential HVAC
              projects across Alberta. Over 37 completed projects and counting.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {Object.entries(projectCounts).map(([category, count]) => (
                <div key={category} className="text-center">
                  <p className="text-2xl font-bold text-[#0094cc]">{count}+</p>
                  <p className="text-sm text-gray-500">{category} Projects</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-[#0094cc] text-white shadow-md shadow-[#0094cc]/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1.5 opacity-70">
                      ({projectCounts[cat]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20 px-4">
          <div className="container mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="break-inside-avoid group relative rounded-xl overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#0094cc] text-white text-xs font-medium mb-2">
                        {image.category}
                      </span>
                      <p className="text-white text-sm font-medium">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note about more projects */}
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                Showing representative projects from our portfolio.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Contact us to discuss your specific project requirements.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center mt-6 h-12 rounded-full bg-[#0094cc] px-8 text-base font-medium text-white hover:bg-[#0176a2] transition-colors"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
