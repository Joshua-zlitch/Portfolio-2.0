import { motion } from 'framer-motion'
import { site } from '../content/site'
import { SectionHeading } from '../components/SectionHeading'

const stats = [
  { name: 'GAME DEVELOPMENT', value: 82, color: 'from-cyberCyan to-cyberPurple' },
  { name: 'WEB DEVELOPMENT', value: 90, color: 'from-cyberCyan via-cyberCyan to-cyberPurple' },
  { name: 'AI / LLM INTEGRATION', value: 85, color: 'from-cyberPurple to-cyberPink' },
  { name: 'VIDEO EDITING', value: 72, color: 'from-cyberPurple via-cyberPink to-cyberPink' },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Developer Loadout" title="About / Profile" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          {/* Column 1: Bio Profile */}
          <div className="relative rounded-xl border border-textLight/10 bg-spaceDark/30 p-8">
            <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-cyberCyan/60" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-cyberCyan/60" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cyberCyan/60" />
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cyberCyan/60" />

            <h3 className="font-heading text-xs uppercase tracking-[0.25em] text-cyberCyan">
              // Core Intel
            </h3>
            
            <p className="mt-5 text-sm leading-relaxed text-textLight/85">
              {site.bio}
            </p>
            
            <p className="mt-4 text-xs leading-relaxed text-textLight/65">
              I view coding as building real-time mechanics. Whether managing asynchronous loops in C#,
              crafting modular gameplay states in Godot, or weaving GPU-conscious shader models into web components,
              my goal is to deliver responsive, visual feedback.
            </p>

            <div className="mt-8 space-y-3 border-t border-textLight/5 pt-6 font-heading text-[11px] uppercase tracking-wider">
              <div className="flex items-center justify-between text-textLight/70">
                <span>Role:</span>
                <span className="text-cyberCyan font-bold">{site.details.role}</span>
              </div>
              <div className="flex items-center justify-between text-textLight/70">
                <span>Current Goal:</span>
                <span className="text-cyberPurple font-bold">{site.details.status}</span>
              </div>
              <div className="flex items-center justify-between text-textLight/70">
                <span>Core Frameworks:</span>
                <span className="text-textLight font-semibold">Unreal • Godot • React • C#</span>
              </div>
            </div>
          </div>

          {/* Column 2: Character Stats & Attributes */}
          <div className="relative rounded-xl border border-textLight/10 bg-spaceDark/20 p-8">
            <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-cyberPurple/60" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-cyberPurple/60" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cyberPurple/60" />
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cyberPurple/60" />

            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xs uppercase tracking-[0.25em] text-cyberPurple">
                // System Diagnostics
              </h3>
              <div className="text-[10px] font-heading uppercase tracking-wider text-textLight/40">
                Level 2.0 Active
              </div>
            </div>

            {/* Stat Progress Bars */}
            <div className="mt-8 space-y-6">
              {stats.map((st) => (
                <div key={st.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-heading uppercase tracking-wider">
                    <span className="text-textLight/80">{st.name}</span>
                    <span className="text-cyberCyan font-bold">{st.value}%</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="h-2 w-full rounded bg-spaceBlack border border-textLight/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${st.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`h-full rounded bg-gradient-to-r ${st.color} shadow-[0_0_8px_rgba(0,240,255,0.2)]`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-textLight/5 pt-6 flex items-center justify-between gap-4 font-heading text-[10px] uppercase tracking-widest text-textLight/45">
              <span>Philosophy:</span>
              <span className="text-cyberPink font-bold">{site.details.philosophy}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
