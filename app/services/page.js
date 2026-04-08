import {
  Fan,
  Flame,
  Wind,
  Thermometer,
  Building2,
  Wrench,
  Shield,
  Droplets,
  Gauge,
  FlaskConical,
  Hammer,
  ClipboardList,
} from "lucide-react";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import ChatWidget from "../../components/ChatWidget";

export const metadata = {
  title: "Our Services | Cascade HVAC Ltd",
  description:
    "Commercial, industrial & residential HVAC services including installation, ductwork, climate control, air quality, and building infrastructure.",
};

const services = [
  {
    title: "HVAC Installation & Replacement",
    icon: Flame,
    description:
      "Complete heating and cooling system installation for commercial, industrial, and residential properties.",
    items: [
      "Roof Top Units (RTU)",
      "Make Up Air (MUA) — direct & indirect fire",
      "Exhaust Fans — direct & belt drive",
      "High-efficiency furnaces",
      "Garage & warehouse unit heaters",
      "Infrared tube heating",
      "HRV/ERV ventilation",
      "Fan coils",
      "Hot water tanks",
    ],
  },
  {
    title: "Ductwork & Fabrication",
    icon: Hammer,
    description:
      "Custom ductwork and sheet metal fabrication in our in-house shop.",
    items: [
      "Galvanized ducting",
      "Aluminum ducting",
      "Stainless steel ducting",
      "Satin coat ducting",
      "Electric & gas duct heaters",
      "Black iron grease ducting",
      "Sheet metal fabrication",
    ],
  },
  {
    title: "Climate Control",
    icon: Thermometer,
    description:
      "Precision climate management systems for optimal comfort and efficiency.",
    items: [
      "Humidification systems",
      "Heat exchangers",
      "Thermostats",
      "Air balancing",
      "Control systems",
      "Hydronic reheat coils",
    ],
  },
  {
    title: "Air Quality & Ventilation",
    icon: Wind,
    description:
      "Comprehensive air quality solutions for healthy, safe indoor environments.",
    items: [
      "Air filtration",
      "Gas detection",
      "Air curtains",
      "Ceiling fans",
      "Dust collection",
      "Lab fume hoods",
      "Medical exhaust",
    ],
  },
  {
    title: "Building Infrastructure",
    icon: Building2,
    description:
      "Essential building systems and mechanical infrastructure.",
    items: [
      "Boiler systems",
      "Insulation & cladding",
      "Garbage & laundry chutes",
      "Motorized dampers",
      "Louvers",
      "Access doors",
      "Vehicle exhaust hose reels",
    ],
  },
  {
    title: "Professional Services",
    icon: ClipboardList,
    description:
      "End-to-end project delivery from design through completion.",
    items: [
      "Design-build",
      "Engineering",
      "Installation",
      "Fabrication",
      "Project management",
      "Maintenance",
      "Permits",
      "Safe work procedures",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Page Header */}
        <section className="bg-gray-50 border-b border-gray-200 py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              From design-build to maintenance, Cascade HVAC delivers complete
              heating, ventilation, and air conditioning solutions for commercial,
              industrial, and residential projects across Alberta.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group rounded-2xl border border-gray-200 p-8 hover:border-[#0094cc]/30 hover:shadow-lg hover:shadow-[#0094cc]/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-600 group-hover:bg-[#0094cc] group-hover:text-white transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Need a Quote?
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              A quote is a quote — there are never surprising extras. Contact us
              today for a free, no-obligation estimate on your HVAC project.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:4032644622"
                className="flex items-center gap-2 h-12 rounded-full bg-[#0094cc] px-8 text-base font-medium text-white hover:bg-[#0176a2] transition-colors"
              >
                <Wrench className="h-4 w-4" />
                403.264.4622
              </a>
              <a
                href="/contact"
                className="flex items-center h-12 rounded-full border-2 border-[#0094cc] px-8 text-base font-medium text-[#0094cc] hover:bg-[#0094cc] hover:text-white transition-colors"
              >
                Request a Free Quote
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
