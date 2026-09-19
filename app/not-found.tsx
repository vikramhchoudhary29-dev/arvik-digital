import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center hero-grid px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
          Error 404
        </p>

        <h1 className="mt-4 text-6xl font-black md:text-8xl">
          Page Not Found
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black"
        >
          <ArrowLeft size={18} />
          Back To Home
        </Link>
      </div>
    </main>
  );
}