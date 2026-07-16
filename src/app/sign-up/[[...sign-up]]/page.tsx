import { SignUp } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignUpPage() {
  return (
    <>
      <Header />
      <section className="bg-brand-100/40 py-20">
        <div className="container-x mx-auto flex max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-extrabold text-brand-900">
            Create Account
          </h1>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
