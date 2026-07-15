import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const heroSlides = [
  {
    title: "Business\nExperience",
    text: "Our expert team understands the changing trends and responds to client demands.",
  },
  {
    title: "Insightful Fiscal\nPolicy",
    text: "Dealnetxchange fiscal policy evaluates economic growth in decision making.",
  },
  {
    title: "Reliability\nIn Right Direction",
    text: "We are committed to maintaining a strong business relationship with our clients.",
  },
];

const introCards = [
  {
    icon: "🔍",
    title: "Perceptive Analysis",
    text: "Dealnetxchange Perceptive Analysis helps blockchain investors understand how they can leverage new, disruptive technologies to gain competitive advantage.",
  },
  {
    icon: "⛰️",
    title: "Business Intelligence",
    text: "Our Business Intelligence has evolved over the years to support and facilitate better business decisions such as risk assessment and data sourcing.",
  },
  {
    icon: "🌐",
    title: "Global Thinking",
    text: "Having a global presence has increased our potential to reach different populations all across the world and offer clarity about various capacities associated with global competence.",
  },
];

const plans = [
  { name: "Starter Plan", percent: "15%", time: "After 24 Hours", min: "1,000 USD", max: "5,000 USD" },
  { name: "Silver Plan", percent: "30%", time: "After 24 Hours", min: "5,000 USD", max: "10,000 USD" },
  { name: "Gold Plan", percent: "60%", time: "After 48 Hours", min: "10,000 USD", max: "50,000 USD" },
  { name: "Diamond Plan", percent: "100%", time: "After 42 Hours", min: "50,000 USD", max: "Unlimited" },
];

const services = [
  {
    title: "Advisory Account",
    text: "Dealnetxchange Trade advisory account helps clients implement investment decisions.",
    href: "/services",
  },
  {
    title: "Blockchain Solutions",
    text: "Dealnetxchange blockchain solution helps clients understand how the platform works.",
    href: "/services",
  },
  {
    title: "Insightful Analysis",
    text: "Our analysis provides deep understanding in managing our clients' business decisions.",
    href: "/services",
  },
];

const projects = [
  {
    tag: "Financial Analysis",
    title: "Advisory Research with Financial Analysis",
    text: "Dealnetxchange has been able to review data and compile reports to determine how our financial market is performing.",
  },
  {
    tag: "Investment Trading",
    title: "Advisory Research with Investment Trading",
    text: "We have the best investment trading systems with low risk assessment.",
  },
  {
    tag: "Wealth Marketing",
    title: "Advisory Research with Wealth Marketing",
    text: "We have built a global wealth management model by identifying trends that are under global financial radars.",
  },
];

const testimonials = [
  { text: "I feel comfortable using this platform. They are reliable with their services, so far so good.", name: "Jason Daniels" },
  { text: "This platform has helped me to diversify and also grow my business. Dealnetxchange return on investment is the best out there.", name: "Robert Smith" },
  { text: "Communicating with their support team is like talking to my best buddy. That excellent customer service is matched with a great software service.", name: "Donald Bryan" },
  { text: "The feeling I get when I invest and see my returns here on Dealnetxchange is second to none honestly. Their process is super easy to understand and system easy to navigate.", name: "Stacey Brown" },
  { text: "I decided to give this platform a trial after others failed, and now I have benefited a lot. I recommend this firm to anyone looking for financial freedom. Thanks a lot Dealnetxchange.", name: "Vicky Emerson" },
];

const steps = [
  { n: 1, icon: "👤", title: "Open an Account" },
  { n: 2, icon: "👛", title: "Fund your Account" },
  { n: 3, icon: "🚀", title: "Choose an Investment Plan" },
  { n: 4, icon: "💰", title: "Financial Growth" },
  { n: 5, icon: "💱", title: "Withdrawal using Cryptocurrency" },
];

export default function Home() {
  return (
    <>
      <Header />

      <section className="relative overflow-hidden bg-muted-900">
        <div
          className="hero-overlay absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(9,40,56,0.92), rgba(116,35,254,0.5)), radial-gradient(circle at 80% 20%, rgba(42,143,181,0.4), transparent 40%)",
          }}
        />
        <div className="container-x relative grid min-h-[560px] place-items-center py-24 text-center text-white">
          <div>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              {heroSlides[0].title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
              {heroSlides[0].text}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/services" className="btn-primary">
                How Can We Help
              </Link>
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {introCards.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{c.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-brand-900">{c.title}</h3>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="sec-title centred">
              <h5>Globally known &amp; trusted</h5>
              <h2>Digital Solution For Emerging Blockchain Investors</h2>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-gray-600">
              Due to high banking risks, digital financing is an ideal step for
              the adoption of blockchain-based financial solutions, and benefits
              include a technological leap forward and a boost to financial
              inclusion and growth.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-100/40 py-20">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div className="relative grid min-h-[320px] place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-600">
            <a
              href="https://www.youtube.com/watch?v=ggq5qKqhJok"
              className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-brand-900"
              aria-label="Play video"
            >
              ▶
            </a>
          </div>
          <div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-3xl">📈</span>
                <div>
                  <h3 className="text-xl font-bold text-brand-900">Leadership Strategy</h3>
                  <p className="text-gray-600">
                    Our Leadership Strategy creates a vision for our clients
                    experience and helps in addressing varied needs and
                    expectations of our clients.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-xl font-bold text-brand-900">Targeted Opportunities</h3>
                  <p className="text-gray-600">
                    Our business analysis helps us focus on opportunities that
                    will be profitable for our clients.
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-8 rounded-xl bg-brand-900 p-6 text-white">
              <p>Call Our Support 24/7. We&rsquo;ll answer all your queries.</p>
              <h3 className="mt-2 text-2xl font-extrabold">VIP</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted-900 py-20 text-white">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="sec-title light">
              <h5>How we charge</h5>
              <h3 className="text-3xl font-extrabold">Investment Plans</h3>
            </div>
            <p className="max-w-sm text-white/70">
              Investment plans tailored to suit everybody irrespective of their
              income and financial background.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div key={p.name} className="gradient-card rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center">
                  <h3 className="text-lg font-bold uppercase tracking-wide">{p.name}</h3>
                  <p className="mt-2 text-xs uppercase opacity-80">recommended</p>
                  <h2 className="my-2 text-5xl font-extrabold">{p.percent}</h2>
                  <p className="opacity-80">{p.time}</p>
                </div>
                <div className="my-5 border-t border-white/20 pt-4 text-sm">
                  <p>Minimum : {p.min}</p>
                  <p>Maximum : {p.max}</p>
                </div>
                <Link
                  href="/login"
                  className="block rounded-md bg-white py-3 text-center font-bold text-brand-900"
                >
                  get started
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-xl font-bold text-teal-300">
            Receive your coins directly to Coinbase wallet for only USA,
            Canada, Australia, New Zealand and Ecuador clients.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="sec-title left">
              <h5 className="text-accent-600">Dealnetxchange Services</h5>
              <h2>How Can We Help</h2>
            </div>
            <p className="max-w-sm text-gray-600">
              Our services are globally accessible to all clients worldwide.
            </p>
            <Link href="/signup" className="btn-primary">
              View All <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 h-40 rounded-lg bg-gradient-to-br from-brand-600 to-accent-500" />
                <h3 className="mb-3 text-xl font-bold text-brand-900">{s.title}</h3>
                <p className="text-gray-600">{s.text}</p>
                <Link
                  href={s.href}
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-accent-600"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-100/30 py-20">
        <div className="container-x text-center">
          <div className="sec-title centred">
            <h5>Globally trusted</h5>
            <h2>Our Recent Projects</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <div key={p.title} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="h-48 bg-gradient-to-br from-muted-700 to-brand-500" />
                <div className="p-6 text-left">
                  <span className="text-sm font-semibold uppercase text-accent-600">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-brand-900">{p.title}</h3>
                  <p className="mt-2 text-gray-600">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted-900 py-20 text-white">
        <div className="container-x text-center">
          <div className="sec-title light centred">
            <h5>Testimonials</h5>
            <h2>What Our Clients Saying</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-left"
              >
                <p className="text-2xl text-accent-400">”</p>
                <p className="text-white/85">{t.text}</p>
                <p className="mt-4 font-bold text-white">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-100/40 py-20">
        <div className="container-x text-center">
          <h2 className="text-2xl font-extrabold text-brand-900">
            Quick Cryptocurrency Converter
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Quickly convert the real-time or historical price of cryptocurrency to
            and from the fiat currency of your choice.
          </p>
          <div
            className="mx-auto mt-6 overflow-hidden rounded-md border border-gray-300 bg-[#FAFAFA]"
            style={{ width: 300, height: 335 }}
          >
            <iframe
              src="https://widget.coinlib.io/widget?type=converter&theme=light"
              width="300"
              height="335"
              title="Cryptocurrency converter"
              className="border-0"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="sec-title centred">
              <h5>Exchange Rates</h5>
              <h2>Live Forex Cross Rates</h2>
            </div>
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
              <iframe
                src="https://dealnetexchange.com/s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.html"
                width="100%"
                height="400"
                title="Forex cross rates"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-800 to-muted-900 py-20 text-white">
        <div className="container-x md:w-1/2 md:ml-auto">
          <div className="sec-title light left">
            <h5>Focus on work</h5>
            <h2>Let&rsquo;s Talk About Growing Your Finances</h2>
          </div>
          <p className="mt-3 text-white/70">Send your queries to our support team.</p>
          <form className="mt-6 space-y-4" action="/contact" method="get">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:border-accent-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:border-accent-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:border-accent-400"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none focus:border-accent-400"
            />
            <button type="submit" className="btn-primary w-full">
              send message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
