export function SectionHeading({
  kicker,
  title,
}: {
  kicker?: string
  title: string
}) {
  return (
    <div className="flex flex-col gap-2 font-heading">
      {kicker ? (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cyberCyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyberCyan animate-pulse inline-block" />
          <span>{kicker}</span>
        </div>
      ) : null}
      <h2 className="relative text-2xl font-extrabold tracking-widest uppercase text-textLight sm:text-3xl">
        <span
          aria-hidden="true"
          className="absolute inset-0 text-cyberPurple/40 blur-[5px] select-none"
        >
          {title}
        </span>
        <span className="relative drop-shadow-[0_3px_6px_rgba(0,0,0,0.85)]">
          {title}
        </span>
      </h2>
    </div>
  )
}
