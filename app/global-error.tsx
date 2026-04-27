"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center bg-[#fffdf7] px-5 text-[#11110f]">
          <section className="w-full max-w-2xl border border-black/10 bg-[#f8f1e7] p-8 text-center sm:p-12">
            <p className="text-xs uppercase tracking-[0.32em] text-[#7a5a19]">Application recovery</p>
            <h1 className="mt-6 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.94] text-[#11110f]">
              The desk needs a clean reload.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-7 text-black/60">
              A top-level error interrupted the page. Retry the view to restore the application shell.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#11110f] px-7 text-sm text-[#fffdf7]"
            >
              Reload view
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
