import Image from "next/image";
import Link from "next/link";
import { fighterFont } from "./fonts";
import SystemStatusBadge from "./SystemStatusBadge";

export default function BigFooter() {
  return (
    <footer className="relative min-h-[560px] overflow-hidden bg-zinc-950 md:min-h-[680px]">
      <Image
        src="/images/truck1.jpg"
        alt="Movvapp truck on the road"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-950 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-between gap-16 px-6 py-16 sm:px-8 lg:py-20">
        <div className="max-w-2xl text-center sm:text-left">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] text-green-400 uppercase">
            Ready when you are
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-heading)] text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&apos;s get you moved.
          </h2>
          <Link
            href="/register"
            className="mt-10 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
          >
            Get started
          </Link>
        </div>

        <p
          className={`${fighterFont.className} self-center text-center text-4xl text-green-400 sm:text-5xl lg:text-6xl`}
        >
          Hama Bila Drama!
        </p>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 text-sm text-zinc-300 sm:flex-row sm:items-end sm:justify-between">
          <span className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
            <Image
              src="/images/moving-truck-full-green.png"
              alt=""
              width={24}
              height={24}
            />
            Movvapp
          </span>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-white">
              Log in
            </Link>
            <Link href="/register" className="hover:text-white">
              Sign up
            </Link>
            <a href="mailto:hello@movvapp.com" className="hover:text-white">
              hello@movvapp.com
            </a>
          </nav>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <SystemStatusBadge />
            <span className="text-zinc-500">
              &copy; {new Date().getFullYear()} Movvapp, Kenya.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
