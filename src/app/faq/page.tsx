import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const faqs = [
  {
    q: "What is Dealnetxchange?",
    a: "Dealnetxchange is a globally accessible digital finance platform that delivers blockchain solutions, insightful analysis, and investment strategies for emerging investors.",
  },
  {
    q: "How do I get started?",
    a: "Open an account, fund your account, choose an investment plan that fits your goals, watch your financial growth, and withdraw using cryptocurrency.",
  },
  {
    q: "Which countries can receive coins to Coinbase?",
    a: "Clients in the USA, Canada, Australia, New Zealand and Ecuador can receive coins directly to a Coinbase wallet.",
  },
  {
    q: "What are the investment plans?",
    a: "We offer Starter (15%), Silver (30%), Gold (60%) and Diamond (100%) plans with varying minimums, maximums and return windows.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We follow strict KYC and data protection policies to keep client information secure and compliant.",
  },
  {
    q: "How can I contact support?",
    a: "Our support team is available 24/7. You can reach us through the contact form or via email at support@dealnetxchange.com.",
  },
];

export default function Faq() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Company"
        title="Frequently Asked Questions"
        subtitle="Answers to the most common questions about Dealnetxchange."
      />
      <section className="py-20">
        <div className="container-x mx-auto max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between font-bold text-brand-900">
                {f.q}
                <span className="text-accent-600 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
