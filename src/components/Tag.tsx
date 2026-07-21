export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded border border-cyberCyan/20 bg-spaceDark/80 px-2.5 py-0.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-cyberCyan shadow-[0_0_8px_rgba(0,240,255,0.05)]">
      {label}
    </span>
  )
}
