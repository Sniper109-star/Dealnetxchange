import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const services = [
  {
    icon: "💡",
    title: "Advisory Account",
    text: "Dealnetxchange Trade advisory account helps clients implement investment decisions with confidence.",
  },
  {
    icon: "🔗",
    title: "Blockchain Solutions",
    text: "Our blockchain solution helps clients understand how the platform works and where value is created.",
  },
  {
    icon: "📊",
    title: "Insightful Analysis",
    text: "Our analysis provides deep understanding in managing our clients' business decisions.",
  },
  {
    icon: "📈",
    title: "Financial Analysis",
    text: "We review data and compile reports to determine how the financial market is performing.",
  },
  {
    icon: "🛡️",
    title: "Risk Assessment",
    text: "Our business intelligence supports better decisions such as risk assessment and data sourcing.",
  },
  {
    icon: "🌍",
    title: "Global Wealth Management",
    text: "We have built a global wealth management model by identifying trends under global financial radars.",
  },
];

export default function Services() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="What We Offer"
        title="Our Services"
        subtitle="Our services are globally accessible to all clients worldwide."
      />
      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 text-4xl">{s.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">{s.title}</h3>
              <p className="text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="container-x mt-14 text-center">
          <Link href="/signup" className="btn-primary">
            Get Started <span className="ml-1">→</span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
