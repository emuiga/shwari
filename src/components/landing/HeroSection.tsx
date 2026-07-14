import Image from "next/image";
import Link from "next/link";
import { fighterFont } from "./fonts";
import ImageCarousel from "./ImageCarousel";

export default function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-zinc-950 lg:min-h-screen">
      <ImageCarousel />

      <div className="relative flex min-h-[720px] flex-col px-6 py-8 sm:px-8 lg:min-h-screen lg:py-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/moving-truck-full-green.png"
              alt=""
              width={28}
              height={28}
            />
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight text-white">
              Movvapp
            </span>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-green-500 hover:text-green-400"
          >
            Log in
          </Link>
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="animate-rise max-w-4xl font-[family-name:var(--font-heading)] text-4xl leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
            The Kenyan
            <br />
            <span
              className={`${fighterFont.className} text-green-500`}
            >
              Moving
            </span>{" "}
            Company.
          </h1>
          <p className="animate-rise mt-8 max-w-md text-lg text-white/70 [animation-delay:120ms]">
            One marketplace to find, compare, and book vetted movers across
            Kenya &mdash; from a bedsitter in Kilimani to a full house move
            upcountry.
          </p>
          <div className="animate-rise mt-10 flex items-center gap-5 [animation-delay:220ms]">
            <Link
              href="/register"
              className="rounded-full bg-green-500 px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
            >
              Find a mover
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
