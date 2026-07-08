import Image from "next/image";
import Link from "next/link";
import { fighterFont } from "./fonts";

export default function BigFooter() {
  return (
    <footer className="relative min-h-[560px] overflow-hidden bg-zinc-950 md:min-h-[680px]">
      <Image
        src="/images/truck1.jpg"
        alt="Shwari Movers truck on the road"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-between gap-16 px-6 py-16 sm:px-8 lg:py-20">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] text-green-400 uppercase">
            Ready when you are
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-heading)] text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&apos;s get you moved.
          </h2>
          <Link
            href="/register"
            className="mt-10 inline-block rounded-full bg-green-500 px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
          >
            Get started
          </Link>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 text-sm text-zinc-300 sm:flex-row sm:items-end sm:justify-between">
          <span className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
            <Image
              src="/images/moving-truck-green.png"
              alt=""
              width={24}
              height={24}
            />
            Shwari Movers
          </span>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/login" className="hover:text-white">
              Log in
            </Link>
            <Link href="/register" className="hover:text-white">
              Sign up
            </Link>
            <a href="mailto:hello@shwarimovers.com" className="hover:text-white">
              hello@shwarimovers.com
            </a>
          </nav>
          <span className="text-zinc-500">
            &copy; {new Date().getFullYear()} Shwari Movers, Kenya.
          </span>
        </div>

        <p
          className={`${fighterFont.className} self-center text-4xl text-green-400 sm:text-5xl lg:text-6xl`}
        >
          Hama Bila Drama!
        </p>
      </div>
    </footer>
  );
}
