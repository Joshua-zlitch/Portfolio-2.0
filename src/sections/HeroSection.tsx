import { motion } from 'framer-motion'
import { site } from '../content/site'
import { GamerTitle } from '../components/GamerTitle'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 z-0 bg-spaceBlack">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(168,85,247,0.12),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-[18%] mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyberCyan/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack via-transparent to-spaceBlack/40" />
      </div>

      <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center justify-center gap-4 font-heading">
            <div className="h-px w-10 bg-cyberCyan/20" />
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-cyberCyan/80">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyberCyan" />
              SYSTEM ACTIVE // PORTFOLIO 2.0
            </div>
            <div className="h-px w-10 bg-cyberCyan/20" />
          </div>

          <GamerTitle text={site.name} />

          <p className="mt-6 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-cyberPurple/90">
            {site.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 font-heading"
          >
            <button
              type="button"
              onClick={() => scrollToId('projects')}
              className="cursor-target group relative inline-flex items-center justify-center rounded border border-cyberCyan/40 bg-cyberCyan/10 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-cyberCyan transition-all hover:bg-cyberCyan/20 hover:shadow-cyanGlow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberCyan/70"
            >
              Launch Deployment
            </button>

            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="cursor-target inline-flex items-center justify-center rounded border border-cyberPurple/40 bg-spaceDark/60 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-cyberPurple transition-all hover:border-cyberPurple/80 hover:bg-cyberPurple/10 hover:shadow-purpleGlow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberPurple/70"
            >
              Comms Channel
            </button>
          </motion.div>

          <div className="mt-14 flex items-center justify-center">
            <svg
              width="450"
              height="20"
              viewBox="0 0 450 20"
              className="w-full max-w-md opacity-60"
              aria-hidden="true"
            >
              <line x1="0" y1="10" x2="160" y2="10" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="290" y1="10" x2="450" y2="10" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" />
              <polygon points="215,3 225,10 235,3 225,17" fill="none" stroke="#00f0ff" strokeWidth="1" />
              <circle cx="190" cy="10" r="2.5" fill="#a855f7" />
              <circle cx="260" cy="10" r="2.5" fill="#a855f7" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-3 text-[10px] font-heading uppercase tracking-[0.3em] text-textLight/40"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full border border-cyberCyan/35 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-cyberCyan/80" />
            </span>
            Traverse Grid To Begin
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
