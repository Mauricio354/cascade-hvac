import Link from "next/link";
import { ArrowRight, Phone, Shield, Clock, Wrench, Flame, Hammer } from "lucide-react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold text-[#0094cc] uppercase tracking-wider mb-4">
                  Trusted HVAC Experts Since 2006
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Alberta&apos;s Trusted
                  <br />
                  <span className="text-[#0094cc]">HVAC Experts</span>
                </h1>
                <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
                  Commercial, industrial &amp; residential heating, ventilation, and
                  air conditioning. A quote is a quote — there are never surprising
                  extras.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 h-12 rounded-full bg-[#0094cc] px-8 text-base font-medium text-white hover:bg-[#0176a2] transition-colors"
                  >
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-center justify-center h-12 rounded-full border border-gray-300 px-8 text-base font-medium text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    Our Services
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    COR Certified
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Mon-Fri, 7am-5pm
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    403.264.4622
                  </span>
                </div>
              </div>
              <div className="relative lg:scale-110 lg:translate-x-8">
                <img
                  src="/hvac.jpg"
                  alt="Commercial HVAC ventilation pipes"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Services */}
        <section className="bg-gray-200/60 py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                From design-build to ongoing maintenance, we deliver complete HVAC
                solutions across Alberta.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Installation",
                  icon: Flame,
                  desc: "RTUs, furnaces, exhaust fans, HRV/ERV systems, hot water tanks, and more for commercial, industrial, and residential projects.",
                },
                {
                  title: "Fabrication",
                  icon: Hammer,
                  desc: "In-house sheet metal fabrication with galvanized, aluminum, stainless steel, and satin coat ducting.",
                },
                {
                  title: "Service & Maintenance",
                  icon: Wrench,
                  desc: "Ongoing maintenance, repairs, air balancing, and climate control to keep your systems running efficiently.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group p-8 rounded-2xl bg-white shadow-md border border-white hover:shadow-lg hover:border-[#0094cc]/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 group-hover:bg-[#0094cc] group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#0094cc] font-medium hover:underline"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              A quote is a quote — there are never surprising extras. Contact us
              today for a free, no-obligation estimate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:4032644622"
                className="flex items-center gap-2 h-12 rounded-full bg-[#0094cc] px-8 text-base font-medium text-white hover:bg-[#0176a2] transition-colors"
              >
                <Wrench className="h-4 w-4" />
                403.264.4622
              </a>
              <Link
                href="/contact"
                className="flex items-center h-12 rounded-full border border-gray-300 px-8 text-base font-medium text-gray-700 hover:border-gray-400 transition-colors"
              >
                Request a Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
