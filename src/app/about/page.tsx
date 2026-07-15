import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export default function About() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Who We Are"
        title="About Dealnetxchange"
        subtitle="A globally trusted digital finance platform helping emerging blockchain investors grow with confidence."
      />
      <section className="py-20">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <div className="sec-title left">
              <h5 className="text-accent-600">Our Story</h5>
              <h2>Creative Approach To Investment Management</h2>
            </div>
            <p className="mt-5 text-gray-600">
              Dealnetxchange is built on the belief that digital financing is the
              ideal step for the adoption of blockchain-based financial solutions.
              Our expert team understands the changing trends and responds to
              client demands with insight and reliability.
            </p>
            <p className="mt-4 text-gray-600">
              Our creative approach balances superior long-term returns with
              minimal risk exposure, helping clients worldwide diversify and grow
              their business through thoughtful advisory and intelligent data
              sourcing.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["120+", "Countries"],
                ["50k+", "Clients"],
                ["$2B+", "Managed"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-brand-100/50 p-4 text-center">
                  <div className="text-2xl font-extrabold text-brand-900">{n}</div>
                  <div className="text-xs text-gray-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500" />
            <div className="mt-10 h-64 rounded-xl bg-gradient-to-br from-muted-700 to-brand-500" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
