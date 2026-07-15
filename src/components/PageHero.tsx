import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-muted-900 py-20 text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(9,40,56,0.95), rgba(116,35,254,0.55))",
        }}
      />
      <div className="container-x relative text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/75">{subtitle}</p>}
        <nav className="mt-6 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <span className="text-white/90">{title}</span>
        </nav>
      </div>
    </section>
  );
}
