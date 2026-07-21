export function GamerTitle({ text }: { text: string }) {
  return (
    <h1 className="relative font-heading text-[clamp(2.0rem,5.5vw,4.0rem)] font-black tracking-wider uppercase leading-none select-none">
      {/* Blurred Backing Cyan Glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-cyberCyan/45 blur-[8px] select-none translate-y-[1px]"
      >
        {text}
      </span>
      {/* Primary White-to-Cyan Gradient Text */}
      <span className="relative bg-gradient-to-r from-textLight via-textLight to-cyberCyan bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
        {text}
      </span>
    </h1>
  )
}
