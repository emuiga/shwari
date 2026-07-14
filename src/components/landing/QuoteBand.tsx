import Link from "next/link";

export default function QuoteBand() {
  return (
    <section className="bg-zinc-50 px-6 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-8 py-16 sm:px-14 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,_rgba(21,128,61,0.55)_0%,_transparent_35%,_transparent_65%,_rgba(34,197,94,0.25)_100%)]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-40 -translate-x-1/2 -translate-y-1/2 rotate-[20deg] bg-gradient-to-b from-transparent via-green-400/20 to-transparent blur-2xl" />

          <div className="relative">
            <span className="text-xs font-semibold tracking-[0.3em] text-green-400 uppercase">
              Why Movvapp
            </span>
            <p className="mt-6 max-w-3xl font-[family-name:var(--font-heading)] text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Every listing on Movvapp is a{" "}
              <span className="relative inline-block">
                vetted, insured
                <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-green-500" />
              </span>{" "}
              mover &mdash; no cold calls, no guesswork, no surprises on move
              day.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400"
              >
                Browse movers
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-green-500 hover:text-green-400"
              >
                Talk to support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
