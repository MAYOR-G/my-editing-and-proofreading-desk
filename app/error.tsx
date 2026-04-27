"use client";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-5 text-ink">
      <section className="w-full max-w-2xl border border-ink/10 bg-paper p-8 text-center sm:p-12">
        <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Something interrupted the desk</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.94] text-ink">
          Let us reload this space.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-charcoal/66">
          A page-level error occurred while preparing this view. Try again to rebuild the interface cleanly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-ink px-7 text-sm text-ivory transition duration-200 ease-premium-out hover:bg-gold-deep active:scale-[0.98]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
