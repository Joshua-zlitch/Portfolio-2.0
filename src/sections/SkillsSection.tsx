import { motion } from 'framer-motion'
import { site } from '../content/site'
import { SectionHeading } from '../components/SectionHeading'

/* Custom SVGs for Skill Badges */
function GameDevIcon() {
  return (
    <svg className="h-6 w-6 text-cyberCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M6 12h4M8 10v4" />
      <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="3" />
      <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="3" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg className="h-6 w-6 text-cyberPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}

function WebDevIcon() {
  return (
    <svg className="h-6 w-6 text-cyberCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="m10 8-3 3 3 3M14 8l3 3-3 3" />
    </svg>
  )
}

function AIcon() {
  return (
    <svg className="h-6 w-6 text-cyberPink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

function getIcon(id: string) {
  switch (id) {
    case 'gamedev': return <GameDevIcon />
    case 'video': return <VideoIcon />
    case 'webdev': return <WebDevIcon />
    case 'aidev': return <AIcon />
    default: return null
  }
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Core Codex" title="Skills & Tech" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {site.skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="group relative rounded-xl border border-textLight/10 bg-spaceDark/30 p-8 transition-all duration-300 hover:border-cyberCyan/20 hover:shadow-cyanGlow"
            >
              {/* Outer light glow rings on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_15%_10%,rgba(0,240,255,0.08)_0%,transparent_40%)]" />
              </div>

              {/* Header block */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.25em] text-cyberPurple/90 group-hover:text-cyberCyan transition-colors">
                    {skill.subtitle}
                  </div>
                  <h3 className="mt-2 font-heading text-lg font-black tracking-wider uppercase text-textLight transition-all group-hover:text-glow-cyan">
                    {skill.title}
                  </h3>
                </div>
                
                {/* SVG Icon Container */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-textLight/10 bg-spaceDark/60 shadow-inner group-hover:border-cyberCyan/40 group-hover:bg-cyberCyan/5 transition-all">
                  {getIcon(skill.id)}
                </div>
              </div>

              <p className="mt-4 text-xs text-textLight/65 font-medium leading-relaxed">
                {skill.description}
              </p>

              {/* Detail points list */}
              <div className="mt-6 space-y-3.5 border-t border-textLight/5 pt-5">
                {skill.items.map((it) => (
                  <div key={it} className="flex items-start gap-3">
                    {/* Glowing square node */}
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-cyberCyan/70 shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                    <p className="text-xs leading-relaxed text-textLight/80">{it}</p>
                  </div>
                ))}
              </div>

              {/* Card Footer telemetry status */}
              <div className="mt-8 border-t border-textLight/5 pt-5 flex items-center justify-between text-[9px] font-heading uppercase tracking-widest text-textLight/35">
                <span>Class: Active</span>
                <span className="text-cyberCyan/80 group-hover:animate-pulse">Loadout Decrypted //</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
