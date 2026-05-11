import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  href?: string;
  tone?: "light" | "dark";
  variant?: "default" | "footer";
};

export function BrandMark({ compact = false, href = "/", tone = "dark", variant = "default" }: BrandMarkProps) {
  const isFooter = variant === "footer";
  const logoSrc = isFooter ? "/assets/darklogo.png" : "/assets/logo.png";
  const textTone = tone === "light" ? "text-ivory" : "text-ink";
  const subTextTone = tone === "light" ? "text-ivory/72" : "text-charcoal/72";

  return (
    <Link
      href={href}
      aria-label="My Editing and Proofreading Desk home"
      className="group inline-flex max-w-full min-w-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:gap-3.5"
    >
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden ${
          compact ? "h-9 w-[4rem] sm:h-11 sm:w-[5.25rem]" : "h-11 w-[4.9rem] min-[420px]:h-12 min-[420px]:w-[5.5rem] sm:h-14 sm:w-[6.5rem]"
        } ${isFooter ? "rounded-[0.35rem] bg-ink/90" : "rounded-[0.25rem]"}`}
      >
        <Image
          src={logoSrc}
          alt=""
          fill
          priority={!isFooter}
          sizes={compact ? "(min-width: 640px) 84px, 72px" : "(min-width: 640px) 104px, 88px"}
          className="object-contain transition-transform duration-300 ease-premium-out group-hover:scale-[1.025]"
        />
      </span>
      <span className={`hidden min-w-0 max-w-[6.9rem] leading-none min-[360px]:block min-[420px]:max-w-[9.25rem] sm:max-w-none ${textTone}`}>
        <span className="block truncate font-display text-[0.9rem] font-semibold tracking-normal min-[420px]:text-[1.02rem] sm:text-[1.16rem]">
          My Editing
        </span>
        <span className={`mt-1 block truncate text-[0.48rem] font-semibold uppercase tracking-[0.11em] min-[420px]:text-[0.55rem] min-[420px]:tracking-[0.13em] sm:text-[0.66rem] sm:tracking-[0.15em] ${subTextTone}`}>
          and Proofreading Desk
        </span>
      </span>
    </Link>
  );
}
