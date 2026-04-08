import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const certifications = ["SMCAA", "ACSA", "COR"];

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="Cascade HVAC Ltd"
              className="h-9 w-auto object-contain invert hue-rotate-180 mix-blend-screen"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              Alberta&apos;s trusted HVAC experts since 2006. Commercial, industrial
              &amp; residential heating, ventilation, and air conditioning.
            </p>
            <div className="flex gap-2 pt-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#377186]"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#377186] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-[#377186] mt-0.5 shrink-0" />
                <span>1022, 93 Gateway Drive NE<br />Airdrie, AB T4B 0J6</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-[#377186] shrink-0" />
                <div>
                  <a href="tel:4032644622" className="hover:text-[#377186] transition-colors">
                    Local: 403.264.4622
                  </a>
                  <br />
                  <a href="tel:8774133665" className="hover:text-[#377186] transition-colors">
                    Toll Free: 877.413.3665
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-[#377186] shrink-0" />
                <a href="mailto:info@cascadehvac.ca" className="hover:text-[#377186] transition-colors">
                  info@cascadehvac.ca
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Business Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock className="h-4 w-4 text-[#377186] shrink-0" />
                <div>
                  <p className="text-white font-medium">Monday - Friday</p>
                  <p>7:00 AM - 5:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock className="h-4 w-4 text-gray-600 shrink-0" />
                <div>
                  <p className="text-white font-medium">Saturday - Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="tel:4032644622"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0094cc] text-white text-sm font-medium hover:bg-[#0176a2] transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cascade HVAC Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            SMCAA Member &middot; ACSA Certified &middot; COR Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
