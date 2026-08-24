import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../content/site'
import { SectionHeading } from '../components/SectionHeading'

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Mailto link is still available as a fallback
    }
  }

  return (
    <section id="contact" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Steel & Signals" title="Contact Terminal" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-12 rounded-xl border border-textLight/10 bg-spaceDark/30 p-8 relative overflow-hidden"
        >
          {/* Neon Border accents */}
          <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-cyberPink/60" />
          <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-cyberPink/60" />
          <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cyberPink/60" />
          <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cyberPink/60" />

          {/* Glowing background highlights */}
          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 h-[200px] w-[250px] rounded-full bg-cyberPink/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between relative z-10">
            {/* Terminal output */}
            <div className="max-w-xl font-heading">
              <div className="text-[10px] uppercase tracking-[0.25em] text-cyberPink flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyberPink animate-pulse" />
                // Decrypting contact sockets
              </div>
              <p className="mt-4 text-sm leading-relaxed text-textLight/85 font-body">
                Open for game dev roles, interactive UI programming, or AI tooling integrations.
                Establish a direct socket below.
              </p>
              
              <div className="mt-6 rounded bg-spaceBlack/80 border border-textLight/5 p-4 text-[10px] text-textLight/50 leading-relaxed font-mono font-medium lowercase">
                <span className="text-cyberCyan">guest@antigravity</span>:<span className="text-cyberPurple">~</span>$ ping -c 3 joshua072308@gmail.com<br/>
                64 bytes from mail-server: icmp_seq=1 ttl=64 time=0.045 ms<br/>
                64 bytes from mail-server: icmp_seq=2 ttl=64 time=0.038 ms<br/>
                <span className="text-cyberPink font-bold">status: connection established</span>
              </div>
            </div>

            {/* Email buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center font-heading">
              <a
                href={`mailto:${site.contact.email}?subject=Collaboration%20Query&body=Hi%20${encodeURIComponent(
                  site.name,
                )}%2C%0A%0A`}
                className="cursor-target inline-flex items-center justify-center rounded border border-cyberPink/60 bg-cyberPink/10 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-textLight transition-all hover:bg-cyberPink/20 hover:shadow-pinkGlow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberPink/70"
              >
                Send Email
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="cursor-target inline-flex items-center justify-center rounded border border-textLight/20 bg-spaceDark/50 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-textLight/80 transition-all hover:border-textLight/40 hover:bg-spaceDark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberPink/70"
              >
                {copied ? 'Copied Socket' : 'Copy Socket Address'}
              </button>
            </div>
          </div>

          <div className="mt-8 h-px bg-textLight/5" />

          {/* Social Network Terminal links */}
          <div className="mt-6 flex flex-wrap items-center gap-4 font-heading">
            <span className="text-[10px] uppercase tracking-[0.2em] text-textLight/40">
              SOCKET LINKS:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {site.contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target inline-flex items-center justify-center rounded-full border border-textLight/10 bg-spaceBlack/50 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-textLight/70 transition-all hover:border-cyberCyan/40 hover:text-cyberCyan hover:bg-cyberCyan/5"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
