import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="grid min-h-[60vh] place-items-center bg-brand-100/40 py-20 text-center">
        <div className="container-x">
          <h1 className="text-6xl font-extrabold text-brand-900">404</h1>
          <p className="mt-4 text-lg text-gray-600">
            The page you are looking for could not be found.
          </p>
          <Link href="/" className="btn-primary mt-8 inline-block">
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
