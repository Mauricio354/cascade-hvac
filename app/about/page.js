import {
  Shield,
  Award,
  Users,
  Banknote,
  Heart,
  HardHat,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import ChatWidget from "../../components/ChatWidget";

export const metadata = {
  title: "About Us | Cascade HVAC Ltd",
  description:
    "Established in 2006, Cascade HVAC specializes in commercial, industrial & residential HVAC. COR certified, SMCAA member, ACSA certified.",
};

const values = [
  {
    icon: Heart,
    title: "Equal Treatment",
    description:
      "Every customer receives the same level of dedication and service, regardless of project size.",
  },
  {
    icon: Shield,
    title: "No Hidden Charges",
    description:
      "Transparent pricing with no surprises. A quote is a quote — period.",
  },
  {
    icon: HardHat,
    title: "Safety Compliance",
    description:
      "COR certified with rigorous safe work procedures on every job site.",
  },
  {
    icon: Banknote,
    title: "Fair Pricing",
    description:
      "Competitive rates that deliver genuine value without cutting corners.",
  },
  {
    icon: Users,
    title: "Skilled Personnel",
    description:
      "Experienced journeyman tradespeople committed to quality workmanship.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "We work with General Contractors to deliver on budget, timeline, and quality expectations.",
  },
];

const certifications = [
  {
    name: "COR",
    full: "Certificate of Recognition",
    description: "Safety excellence in the workplace.",
  },
  {
    name: "SMCAA",
    full: "Sheet Metal Contractors Association of Alberta",
    description: "Recognized member in good standing.",
  },
  {
    name: "ACSA",
    full: "Alberta Construction Safety Association",
    description: "Committed to construction safety standards.",
  },
];

const team = [
  {
    name: "Justin Arnold",
    role: "General Manager / Estimating",
    initials: "JA",
  },
  {
    name: "Rachel Arnold",
    role: "Office / Accounting",
    initials: "RA",
  },
  {
    name: "Mike Anderson",
    role: "Service",
    initials: "MA",
  },
  {
    name: "AJ Enns",
    role: "Project Manager",
    initials: "AE",
  },
  {
    name: "Brett Jones",
    role: "Project Coordinator",
    initials: "BJ",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Page Header */}
        <section className="bg-gray-50 border-b border-gray-200 py-20 px-4">
          <div className="container mx-auto text-center">
            <p className="text-[#0094cc] font-semibold text-sm uppercase tracking-wider mb-3">
              Established in 2006
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Cascade HVAC
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Alberta&apos;s trusted partner for commercial, industrial, and
              residential HVAC solutions. Built on integrity, delivered with
              expertise.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Who We Are
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Since 2006, Cascade HVAC has specialized in working with General
                    Contractors to deliver heating, ventilation, and air conditioning
                    projects on budget, on time, and to the highest quality standards.
                  </p>
                  <p>
                    We treat every customer equally — from small residential repairs to
                    large-scale industrial installations. Our team of skilled
                    tradespeople brings decades of combined experience to every project.
                  </p>
                  <p>
                    Based in Airdrie, Alberta, we serve Calgary and surrounding areas
                    with a commitment to fair pricing, transparent communication, and
                    uncompromising safety standards.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop"
                  alt="HVAC construction work"
                  className="rounded-2xl shadow-lg w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#0094cc] text-white rounded-2xl p-6 shadow-lg">
                  <p className="text-3xl font-bold">18+</p>
                  <p className="text-sm text-white/80">Years of Service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Team</h2>
            <p className="text-gray-500 mb-10">
              Meet the experienced professionals behind Cascade HVAC.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#024C68] flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Quote */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <Quote className="h-12 w-12 text-[#0094cc]/20 mx-auto mb-4" />
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              &ldquo;A quote is a quote, there are never surprising extras.&rdquo;
            </blockquote>
            <p className="mt-4 text-gray-500 font-medium">
              Our promise to every client
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                The principles that guide everything we do at Cascade HVAC.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="flex gap-4 p-6 rounded-xl border border-gray-100 hover:border-[#0094cc]/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-600 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900">
                Certifications &amp; Memberships
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Our commitment to safety and professionalism is backed by
                industry-recognized certifications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-medium text-[#0094cc] mb-2">
                    {cert.full}
                  </p>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financing */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="container mx-auto text-center max-w-3xl">
            <Banknote className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Financing Available
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              Through FinanceIt, we offer financing options up to{" "}
              <span className="text-white font-bold">$100,000</span> for qualifying
              projects.
            </p>
            <p className="text-gray-400 text-sm">
              Ask us about flexible payment plans to fit your budget.
            </p>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
