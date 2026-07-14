import Image from "next/image";
import Link from "next/link";

const FLOATING_ICONS = [
  {
    src: "/icons/truck-green.png",
    className: "top-10 left-[18%] h-9 w-9 -rotate-12 sm:top-14 sm:left-[28%] sm:h-12 sm:w-12",
  },
  {
    src: "/icons/fridge-green.png",
    className: "top-20 right-[15%] h-12 w-12 rotate-6 sm:top-6 sm:right-[27%] sm:h-16 sm:w-16",
  },
  {
    src: "/icons/company-green.png",
    className: "bottom-16 left-[22%] h-11 w-11 rotate-3 sm:bottom-10 sm:left-[30%] sm:h-14 sm:w-14",
  },
  {
    src: "/icons/move-green.png",
    className: "bottom-6 right-[20%] h-8 w-8 -rotate-6 sm:bottom-16 sm:right-[30%] sm:h-10 sm:w-10",
  },
];

export default function ConnectBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-green-100 to-green-50 px-6 py-24 text-center sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(21,128,61,0.18),_transparent_65%)]" />

      {FLOATING_ICONS.map((icon) => (
        <Image
          key={icon.src}
          src={icon.src}
          alt=""
          width={64}
          height={64}
          aria-hidden
          className={`pointer-events-none absolute object-contain opacity-80 ${icon.className}`}
        />
      ))}

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
