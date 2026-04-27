import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  href?: string;
  tone?: "light" | "dark";
};

export function BrandMark({ compact = false, href = "/", tone = "dark" }: BrandMarkProps) {
  return (
    <Link href={href} className="group inline-flex min-w-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:gap-3">
      <span className="relative flex h-10 w-[58px] shrink-0 items-center justify-center overflow-hidden sm:h-11 sm:w-[77px]">
        <Image
          src="/assets/logo.png"
          alt="My Editing and Proofreading Desk logo"
          fill
          priority
          sizes="(min-width: 640px) 77px, 58px"
          className="object-contain transition-transform duration-300 ease-premium-out group-hover:scale-[1.02]"
        />
      </span>
      {!compact ? (
        <span className={`min-w-0 leading-tight ${tone === "light" ? "text-ivory" : "text-ink"}`}>
          <span className="block truncate font-display text-[0.95rem] sm:text-[1.05rem]">My Editing</span>
          <span className={`block max-w-[9.5rem] truncate text-[0.58rem] uppercase tracking-[0.12em] sm:max-w-none sm:text-[0.72rem] sm:tracking-[0.18em] ${tone === "light" ? "text-ivory/62" : "text-charcoal/70"}`}>and Proofreading Desk</span>
        </span>
      ) : null}
    </Link>
  );
}
