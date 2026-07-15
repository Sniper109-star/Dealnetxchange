import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="Dealnetxchange home">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-600 to-brand-500 text-white font-black text-lg shadow-md">
        D
      </span>
      <span className="text-2xl font-extrabold tracking-tight text-brand-900">
        Dealnet<span className="text-accent-600">xchange</span>
      </span>
    </Link>
  );
}
