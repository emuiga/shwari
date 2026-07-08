import Link from "next/link";

export default function ConnectBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-green-100 to-green-50 px-6 py-24 text-center sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(21,128,61,0.18),_transparent_65%)]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-600/20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-600/10" />

      <div className="relative mx-auto max-w-2xl">
        <span className="text-xs font-semibold tracking-[0.3em] text-green-700 uppercase">
          Time to move
        </span>
        <p className="mt-6 font-[family-name:var(--font-heading)] text-2xl leading-snug font-medium tracking-tight text-zinc-900 sm:text-3xl">
          Whether it&apos;s a studio move across town or a full house
          relocation, tell us what you need and we&apos;ll match you with the
          right crew.
        </p>
        <Link
          href="/service-requests/new"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          Request a move
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
