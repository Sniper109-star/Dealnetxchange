import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export function LegalPage({
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <Header />
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <section className="py-20">
        <div className="container-x mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-bold text-brand-900">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
