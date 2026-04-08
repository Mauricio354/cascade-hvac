"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Shield,
} from "lucide-react";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import ChatWidget from "../../components/ChatWidget";

const teamContacts = [
  {
    name: "Mike Anderson",
    role: "Service",
    email: "mike@cascadehvac.ca",
    phone: "403.588.5550",
    initials: "MA",
  },
  {
    name: "AJ Enns",
    role: "Project Manager",
    email: "aj@cascadehvac.ca",
    phone: "403.703.7467",
    initials: "AE",
  },
  {
    name: "Brett Jones",
    role: "Project Coordinator",
    email: "brett@cascadehvac.ca",
    phone: "403.880.4584",
    initials: "BJ",
  },
  {
    name: "Justin Arnold",
    role: "GM / Estimating",
    email: "justin@cascadehvac.ca",
    phone: "403.973.4113",
    initials: "JA",
  },
  {
    name: "Rachel Arnold",
    role: "Office / Accounting",
    email: "rachel@cascadehvac.ca",
    phone: "403.615.4113",
    initials: "RA",
  },
];

const serviceOptions = [
  "HVAC Installation",
  "Furnace Replacement",
  "Ductwork & Fabrication",
  "Climate Control",
  "Air Quality & Ventilation",
  "Building Infrastructure",
  "Maintenance & Repairs",
  "Commercial / Industrial",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder — wire up to FormSubmit.co or your preferred handler
    // Example: POST to https://formsubmit.co/ajax/info@cascadehvac.ca
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Page Header */}
        <section className="bg-gray-50 border-b border-gray-200 py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Ready to start your HVAC project? Get in touch with our team for a
              free, no-obligation quote.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mx-auto mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                <p className="text-sm text-gray-500">
                  1022, 93 Gateway Drive NE
                  <br />
                  Airdrie, AB T4B 0J6
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mx-auto mb-3">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                <p className="text-sm text-gray-500">
                  <a
                    href="tel:4032644622"
                    className="hover:text-[#0094cc] transition-colors"
                  >
                    Local: 403.264.4622
                  </a>
                  <br />
                  <a
                    href="tel:8774133665"
                    className="hover:text-[#0094cc] transition-colors"
                  >
                    Toll Free: 877.413.3665
                  </a>
                  <br />
                  <span className="text-gray-400">Fax: 403.264.4622</span>
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mx-auto mb-3">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Hours</h3>
                <p className="text-sm text-gray-500">
                  Monday - Friday
                  <br />
                  7:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form + Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 mb-8">
                  Fill out the form below and we&apos;ll get back to you within one
                  business day.
                </p>

                {submitted ? (
                  <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                      <Send className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for contacting Cascade HVAC. We&apos;ll be in touch
                      shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="mt-6 text-[#0094cc] font-medium text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#0094cc] focus:ring-2 focus:ring-[#0094cc]/10 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#0094cc] focus:ring-2 focus:ring-[#0094cc]/10 transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#0094cc] focus:ring-2 focus:ring-[#0094cc]/10 transition-colors"
                          placeholder="403.XXX.XXXX"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Service Type
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#0094cc] focus:ring-2 focus:ring-[#0094cc]/10 transition-colors appearance-none bg-white"
                        >
                          <option value="">Select a service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#0094cc] focus:ring-2 focus:ring-[#0094cc]/10 transition-colors resize-none"
                        placeholder="Tell us about your project or what you need help with..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 rounded-full bg-[#0094cc] px-10 text-base font-medium text-white hover:bg-[#0176a2] transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Team Contacts Sidebar */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Direct Contacts
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Reach our team members directly.
                </p>
                <div className="space-y-4">
                  {teamContacts.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#0094cc]/20 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {member.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm">
                          {member.name}
                        </p>
                        <p className="text-xs text-[#0094cc] font-medium">
                          {member.role}
                        </p>
                        <div className="mt-1.5 space-y-0.5">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0094cc] transition-colors"
                          >
                            <Mail className="h-3 w-3 shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </a>
                          <a
                            href={`tel:${member.phone.replace(/\./g, "")}`}
                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0094cc] transition-colors"
                          >
                            <Phone className="h-3 w-3 shrink-0" />
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Health & Safety */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        Health &amp; Safety
                      </p>
                      <a
                        href="mailto:safety@cascadehvac.ca"
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0094cc] transition-colors mt-1"
                      >
                        <Mail className="h-3 w-3 shrink-0" />
                        safety@cascadehvac.ca
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Find Us
            </h2>
            <p className="text-gray-500 mb-8">
              1022, 93 Gateway Drive NE, Airdrie, AB T4B 0J6
            </p>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="Cascade HVAC Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2494.5!2d-114.0!3d51.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDE4JzAwLjAiTiAxMTTCsDAwJzAwLjAiVw!5e0!3m2!1sen!2sca!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
