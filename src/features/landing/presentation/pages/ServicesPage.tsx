import Image from 'next/image';
import Link from 'next/link';
import { renderCategoryIcon } from '@/features/provider/service-listing/presentation/lib/categoryIcons';
import BigFooter from '@/components/landing/BigFooter';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';

interface ServicesPageProps {
  categories: ServiceCategory[];
}

export default function ServicesPage({ categories }: ServicesPageProps) {
  const sorted = categories.slice().sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1300px] bg-[radial-gradient(ellipse_at_top_left,_rgba(34,197,94,0.4)_0%,_rgba(34,197,94,0.14)_45%,_rgba(9,9,11,0)_80%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[700px] w-[700px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,_rgba(34,197,94,0.16)_0%,_rgba(9,9,11,0)_70%)]" />

      <section className="relative flex min-h-[520px] flex-col overflow-hidden sm:min-h-[600px]">
        <Image src="/images/truck2.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-zinc-950" />

        <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/moving-truck-full-green.png" alt="" width={28} height={28} />
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight text-white">
              Movvapp
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-sm font-medium text-white/80 transition-colors hover:text-green-400">
              Services
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-white/80 transition-colors hover:text-green-400">
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-primary hover:text-green-400"
            >
              Log in
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto flex flex-1 max-w-3xl flex-col items-center justify-center px-6 text-center sm:px-8">
          <span className="text-xs font-semibold tracking-[0.3em] text-green-400 uppercase">What we cover</span>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            Every kind of move, handled by vetted pros.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            From a single-item pickup to a full cross-country relocation, Movvapp connects you with movers who
            specialize in exactly what you need.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-8 lg:pb-24">
        {sorted.length === 0 ? (
          <p className="mt-16 text-center text-white/60">Services are unavailable right now. Please check back shortly.</p>
        ) : (
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 border-t border-white/10 sm:grid-cols-2">
            {sorted.map((category, index) => (
              <div
                key={category.id}
                className="flex items-start gap-5 border-b border-white/10 px-1 py-7 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <span className="mt-1 font-[family-name:var(--font-heading)] text-sm font-semibold text-white/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-primary">
                  {renderCategoryIcon(category.code, 'h-6 w-6')}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-base font-semibold text-white">
                    {category.name}
                  </p>
                  {category.description && (
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{category.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 text-center">
          <Link
            href="/register"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
          >
            Get a free quote
          </Link>
          <p className="text-sm text-white/50">No commitment &mdash; compare movers and prices before you book.</p>
        </div>
      </section>

      <BigFooter />
    </div>
  );
}
