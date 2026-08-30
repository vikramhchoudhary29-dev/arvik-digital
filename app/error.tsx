"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center hero-grid px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">
          Something Went Wrong
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-7xl">
          Unexpected Error
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          An unexpected error occurred while loading this page.
        </p>

        <button
          onClick={() => reset()}
          className="mt-10 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}