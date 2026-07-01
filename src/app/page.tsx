import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 p-16 text-center dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Shwari Movers
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Marketplace connecting customers with vetted moving and transportation
        service providers.
      </p>
      <Link
        href="/login"
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Go to Login
      </Link>
    </div>
  );
}
