import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/login-image.png"
          alt="Shwari Movers loading a truck"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_75%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center text-white">
          <h1 className="font-heading text-6xl font-extrabold tracking-tighter [text-shadow:0_4px_24px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.6)]">
            Movvapp
          </h1>
          <p className="mt-5 max-w-sm text-base font-light leading-snug tracking-wide text-emerald-300 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
            Connecting You with Trusted Movers, Ensuring Safe and Secure
            Relocations!
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <Image
          src="/images/moving-truck-green.png"
          alt=""
          width={64}
          height={64}
          className="mb-6 h-16 w-16 animate-drive"
        />
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
