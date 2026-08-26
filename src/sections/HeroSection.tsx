import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../content/site'
import { GamerTitle } from '../components/GamerTitle'

const BOOT_MESSAGES = ['INITIALIZING PORTFOLIO', 'SYNCING CREATIVE CORE', 'SYSTEM READY']

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function BootScreen({ ready }: { ready: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (ready) return
    const timer = window.setInterval(() => {
      setMessageIndex((current) => Math.min(current + 1, BOOT_MESSAGES.length - 1))
    }, 650)
    return () => window.clearInterval(timer)
  }, [ready])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: ready ? 0 : 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[100] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-spaceBlack px-6 text-center ${ready ? 'pointer-events-none' : 'pointer-events-auto'}`}
      aria-hidden={ready}
    >
      <div className="hero-boot__halo" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-8 flex items-center justify-center gap-3 font-heading text-[9px] uppercase tracking-[0.4em] text-cyberCyan/70">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyberCyan" />
          Secure connection // portfolio node
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyberCyan" />
        </div>
        <div className="hero-boot__display">
          <span className="hero-boot__message">{BOOT_MESSAGES[messageIndex]}</span>
        </div>
        <div className="mt-7 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-textLight/40">
          <span>CORE // ONLINE</span>
          <span className="text-cyberPurple">MEM // SYNC</span>
          <span className="text-cyberPink">{String((messageIndex + 1) * 33).padStart(2, '0')}%</span>
        </div>
        <div className="mt-4 h-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyberCyan via-cyberPurple to-cyberPink"
            initial={{ width: '8%' }}
            animate={{ width: ready ? '100%' : `${18 + messageIndex * 28}%` }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-5 font-heading text-[9px] uppercase tracking-[0.28em] text-textLight/30">
          Please wait // establishing visual interface
        </p>
      </div>
    </motion.div>
  )
}

function FloatingTelemetryCard() {
  return (
    <motion.button
      type="button"
      onClick={() => scrollToId('contact')}
      initial={{ opacity: 0, y: 20, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, rotate: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-target group absolute bottom-24 right-6 z-30 hidden w-64 rounded-lg border border-cyberCyan/30 bg-spaceDark/75 p-4 text-left shadow-[0_0_30px_rgba(0,240,255,0.12)] backdrop-blur-md sm:block lg:right-14"
      aria-label="Open contact terminal"
    >
      <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-cyberCyan/75">
        <span>Live telemetry</span>
        <span className="flex items-center gap-1.5 text-cyberCyan"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyberCyan" /> online</span>
      </div>
      <div className="grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
        <div className="rounded border border-white/10 bg-white/[0.03] p-2">
          <span className="block text-textLight/40">Focus</span>
          <span className="mt-1 block text-cyberPurple">Game systems</span>
        </div>
        <div className="rounded border border-white/10 bg-white/[0.03] p-2">
          <span className="block text-textLight/40">Signal</span>
          <span className="mt-1 block text-cyberPink">Open to work</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 font-heading text-[9px] uppercase tracking-[0.2em] text-textLight/45 transition-colors group-hover:text-cyberCyan">
        <span>Open contact terminal</span>
        <span>↗</span>
      </div>
    </motion.button>
  )
}

function HeroContent() {
  return (
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
  )
}

export function HeroSection() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior
    const previousBodyOverscroll = document.body.style.overscrollBehavior

    if (!ready) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overscrollBehavior = 'none'
      document.body.style.overscrollBehavior = 'none'
      window.scrollTo(0, 0)
    }

    const timer = window.setTimeout(() => setReady(true), 1950)

    return () => {
      window.clearTimeout(timer)
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll
      document.body.style.overscrollBehavior = previousBodyOverscroll
    }
  }, [ready])

  return (
    <section id="top" aria-busy={!ready} className="relative min-h-screen overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 z-0 bg-spaceBlack">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-grid__glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(168,85,247,0.12),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-[18%] mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyberCyan/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack via-transparent to-spaceBlack/40" />
      </div>

      <HeroContent />
      <FloatingTelemetryCard />
      <BootScreen ready={ready} />
    </section>
  )
}
